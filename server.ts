
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!
);
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { INITIAL_DESTINATIONS, INITIAL_FOOD_ITEMS, INITIAL_FESTIVALS, DEFAULT_WEATHER_DATA } from "./src/data/kokanData";
import { Destination, FoodItem, Festival, Enquiry, ItineraryPlan, BudgetBreakdown } from "./src/types";
// In-memory persistent state
let destinationsList: Destination[] = [...INITIAL_DESTINATIONS];
let foodList: FoodItem[] = [...INITIAL_FOOD_ITEMS];
let festivalList: Festival[] = [...INITIAL_FESTIVALS];
let enquiriesList: Enquiry[] = [
  {
    id: "enq-101",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    phone: "+91 98201 45678",
    numTravelers: 4,
    travelDates: "2026-10-15 to 2026-10-18",
    preferredDistrict: "Sindhudurg",
    message: "Looking for a 3-day family trip to Tarkarli with scuba diving and house boat stay.",
    status: "New",
    createdAt: new Date().toISOString()
  },
  {
    id: "enq-102",
    name: "Ananya Deshmukh",
    email: "ananya.d@example.com",
    phone: "+91 97654 32109",
    numTravelers: 2,
    travelDates: "2026-09-02 to 2026-09-05",
    preferredDistrict: "Ratnagiri",
    message: "Planning Ganpatipule and Velas turtle beach visit during Ganesh festival season.",
    status: "Contacted",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// Admin Token Store
const ADMIN_SECRET_TOKEN = "talkokan-admin-jwt-token-2026";

async function startServer() {
  const app = express();
 const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check API
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", appName: "Talkokan Tourism Portal" });
  });

  // Authentication Middleware
  const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1] === ADMIN_SECRET_TOKEN) {
      next();
      return;
    }
    res.status(401).json({ error: "Unauthorized: Invalid or missing admin credentials" });
  };

  // Admin Login
  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    if ((email === "admin@talkokan.com" || email === "admin") && password === "kokan2026") {
      res.json({
        email: "admin@talkokan.com",
        role: "admin",
        token: ADMIN_SECRET_TOKEN
      });
    } else {
      res.status(400).json({ error: "Invalid admin email or password. Hint: admin@talkokan.com / kokan2026" });
    }
  });

  // DESTINATIONS API
  app.get("/api/destinations", (req: Request, res: Response) => {
    let result = [...destinationsList];
    const { district, category, season, search } = req.query;

    if (district && typeof district === "string" && district !== "All") {
      result = result.filter(d => d.district.toLowerCase() === district.toLowerCase());
    }

    if (category && typeof category === "string" && category !== "All") {
      result = result.filter(d => d.category.toLowerCase() === category.toLowerCase());
    }

    if (season && typeof season === "string" && season !== "All") {
      result = result.filter(d => d.seasonBadge.toLowerCase().includes(season.toLowerCase()));
    }

    if (search && typeof search === "string" && search.trim() !== "") {
      const query = search.toLowerCase().trim();
      result = result.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.district.toLowerCase().includes(query) ||
        d.highlights.some(h => h.toLowerCase().includes(query))
      );
    }

    res.json(result);
  });

  app.get("/api/destinations/:id", (req: Request, res: Response) => {
    const dest = destinationsList.find(d => d.id === req.params.id);
    if (!dest) {
      res.status(404).json({ error: "Destination not found" });
      return;
    }
    res.json(dest);
  });

  app.post("/api/destinations", requireAdmin, (req: Request, res: Response) => {
    const newDest: Destination = {
      ...req.body,
      id: req.body.id || `dest-${Date.now()}`
    };
    destinationsList.unshift(newDest);
    res.status(201).json(newDest);
  });

  app.put("/api/destinations/:id", requireAdmin, (req: Request, res: Response) => {
    const index = destinationsList.findIndex(d => d.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: "Destination not found" });
      return;
    }
    destinationsList[index] = { ...destinationsList[index], ...req.body };
    res.json(destinationsList[index]);
  });

  app.delete("/api/destinations/:id", requireAdmin, (req: Request, res: Response) => {
    const index = destinationsList.findIndex(d => d.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: "Destination not found" });
      return;
    }
    const removed = destinationsList.splice(index, 1);
    res.json({ message: "Destination deleted successfully", destination: removed[0] });
  });

  // CULINARY / FOOD API
  app.get("/api/food", (_req: Request, res: Response) => {
    res.json(foodList);
  });

  app.post("/api/food", requireAdmin, (req: Request, res: Response) => {
    const newItem: FoodItem = {
      ...req.body,
      id: req.body.id || `food-${Date.now()}`
    };
    foodList.unshift(newItem);
    res.status(201).json(newItem);
  });

  // FESTIVALS API
  app.get("/api/festivals", (_req: Request, res: Response) => {
    res.json(festivalList);
  });

  // WEATHER API
  app.get("/api/weather", (req: Request, res: Response) => {
    const district = (req.query.district as string) || "Sindhudurg";
    const data = DEFAULT_WEATHER_DATA[district] || DEFAULT_WEATHER_DATA["Sindhudurg"];
    res.json(data);
  });

  // BUDGET CALCULATOR LOGIC
  app.post("/api/budget/calculate", (req: Request, res: Response) => {
    const { daysCount, travelersCount, luxuryLevel, travelMode } = req.body;

    const days = Math.max(1, parseInt(daysCount) || 1);
    const count = Math.max(1, parseInt(travelersCount) || 1);

    // Rates calculation logic
    let dailyStayPerPerson = 1200; // Standard / Family default
    if (luxuryLevel === "Budget / Backpacker") dailyStayPerPerson = 600;
    if (luxuryLevel === "Luxury Resort") dailyStayPerPerson = 3500;

    let totalTransportCost = 2000;
    if (travelMode === "Bus & Local Transport") totalTransportCost = 800 * count;
    if (travelMode === "Self Car / Rental") totalTransportCost = 3500 + (days * 1000);
    if (travelMode === "Private Taxi") totalTransportCost = 5000 + (days * 1800);

    let dailyFoodPerPerson = 700;
    if (luxuryLevel === "Budget / Backpacker") dailyFoodPerPerson = 400;
    if (luxuryLevel === "Luxury Resort") dailyFoodPerPerson = 1400;

    let dailyActivityPerPerson = 600; // Scuba, Fort ferry, Watersports
    if (luxuryLevel === "Budget / Backpacker") dailyActivityPerPerson = 300;
    if (luxuryLevel === "Luxury Resort") dailyActivityPerPerson = 1500;

    const totalStay = dailyStayPerPerson * count * days;
    const totalFood = dailyFoodPerPerson * count * days;
    const totalActivity = dailyActivityPerPerson * count * days;
    const grandTotal = totalStay + totalTransportCost + totalFood + totalActivity;
    const perPerson = Math.round(grandTotal / count);

    const breakdown: BudgetBreakdown = {
      daysCount: days,
      travelersCount: count,
      luxuryLevel,
      travelMode,
      stayCost: totalStay,
      transportCost: totalTransportCost,
      foodCost: totalFood,
      activityCost: totalActivity,
      totalCost: grandTotal,
      perPersonCost: perPerson
    };

    res.json(breakdown);
  });

  // TALKOKAN PLANNER ALGORITHM
  app.post("/api/planner/generate", (req: Request, res: Response) => {
    const { daysCount, travelStyle, districts, budgetPreference } = req.body;

    const days = Math.min(5, Math.max(1, parseInt(daysCount) || 3));
    const chosenDistricts: string[] = Array.isArray(districts) && districts.length > 0 ? districts : ["Sindhudurg", "Ratnagiri"];

    // Filter relevant destinations based on districts and category match
    let pool = destinationsList.filter(d => chosenDistricts.includes(d.district));
    if (pool.length < days * 2) {
      pool = [...destinationsList]; // Fallback to all Kokan
    }

    const schedule = [];
    for (let day = 1; day <= days; day++) {
      const destIndex = (day - 1) % pool.length;
      const morningDest = pool[destIndex];
      const eveningDest = pool[(destIndex + 1) % pool.length];

      schedule.push({
        day,
        title: `Day ${day}: ${morningDest.name} & ${eveningDest.district} Coastline`,
        morning: `Morning visit to ${morningDest.name} (${morningDest.category}). Enjoy ${morningDest.highlights[0] || 'panoramic ocean views'}. Best time: early morning breeze.`,
        afternoon: `Authentic Malvani lunch nearby. Try ${morningDest.popularFoodNearby[0] || 'Sol Kadhi & Surmai Fry'}. Post lunch, explore ${morningDest.highlights[1] || 'local village heritage'}.`,
        evening: `Head to ${eveningDest.name} for sunset view. ${eveningDest.travelTips}`,
        recommendedFood: morningDest.popularFoodNearby.join(", "),
        staySuggestion: `Beachside Homestay or Resort near ${morningDest.district} coast.`,
        coordinates: morningDest.coordinates
      });
    }

    const plan: ItineraryPlan = {
      id: `plan-${Date.now()}`,
      title: `${days}-Day ${travelStyle || 'Custom'} Tour of Kokan`,
      daysCount: days,
      totalEstimatedBudget: days * 2500,
      travelStyle: travelStyle || 'Relaxation & Beaches',
      districtsCovered: chosenDistricts as any,
      dailySchedule: schedule
    };

    res.json(plan);
  });
// ENQUIRIES API

// Get all enquiries - Admin only
app.get("/api/enquiries", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      res.status(500).json({ error: "Failed to fetch enquiries" });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Enquiry fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Submit new enquiry
app.post("/api/enquiries", async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      numTravelers,
      travelDates,
      preferredDistrict,
      message,
    } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        error: "Name, email and message are required",
      });
      return;
    }

    const { data, error } = await supabase
      .from("enquiries")
      .insert({
        name,
        email,
        phone: phone || null,
        subject: null,
        message,
        status: "New",
        num_travelers: parseInt(numTravelers) || 1,
        travel_dates: travelDates || "Flexible",
        preferred_district: preferredDistrict || "Whole Kokan Belt",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      res.status(500).json({
        error: "Failed to save enquiry",
      });
      return;
    }

    res.status(201).json({
      message: "Enquiry submitted successfully!",
      enquiry: data,
    });
  } catch (error) {
    console.error("Enquiry submit error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Update enquiry status - Admin only
app.patch("/api/enquiries/:id/status", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!["New", "Contacted", "Resolved"].includes(status)) {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }

    const { data, error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      res.status(500).json({
        error: "Failed to update enquiry",
      });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Enquiry status update error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});
  app.patch("/api/enquiries/:id/status", requireAdmin, (req: Request, res: Response) => {
    const { status } = req.body;
    const enq = enquiriesList.find(e => e.id === req.params.id);
    if (!enq) {
      res.status(404).json({ error: "Enquiry not found" });
      return;
    }
    if (["New", "Contacted", "Resolved"].includes(status)) {
      enq.status = status;
      res.json(enq);
    } else {
      res.status(400).json({ error: "Invalid status value" });
    }
  });

  // AI LOCAL GUIDE ADVISOR (Using Server-Side Gemini API)
  app.post("/api/ai/suggest", async (req: Request, res: Response) => {
    try {
      const { userQuery, district, type } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error: "Gemini API key is missing. Please set GEMINI_API_KEY in Secrets."
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are "Talkokan Local Guide", an authentic cultural and travel expert for the Kokan region (Ratnagiri, Sindhudurg, Raigad, Palghar) in coastal Maharashtra.
User asks: "${userQuery || 'Give me hidden travel tips for Kokan'}"
Selected District Context: ${district || 'All Kokan'}
Request Type: ${type || 'general'}

Provide a structured, enthusiastic, and highly authentic recommendation (in 3-4 bullet points) covering:
1. Local insider secret (spot/time/experience)
2. Must-eat Malvani dish or hidden mess recommendation
3. Cultural/Monsoon/Coastal safety tip
4. Useful local Marathi greeting or phrase with meaning. Keep tone warm, welcoming (Atithi Devo Bhava), and practical!`;

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
      });

      res.json({ answer: geminiResponse.text });
    } catch (err: any) {
      console.error("Gemini AI API Error:", err);
      res.status(500).json({
        error: "Failed to generate AI Kokan suggestion",
        details: err?.message || "Internal server error"
      });
    }
  });

  // Vite Middleware Setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Talkokan Tourism full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
