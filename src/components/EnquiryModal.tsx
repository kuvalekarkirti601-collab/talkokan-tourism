import React, { useState } from "react";
import {
  X,
  Send,
  CheckCircle,
  User,
  Mail,
  Phone,
  Users,
  MapPin,
  Calendar,
  MessageSquare,
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
  Lock,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const districts = [
  "Kankavli",
  "Malvan",
  "Sawantwadi",
  "Dodamarg",
  "Kudal",
  "Vaibhavwadi",
  "Vengurla",
  "Devgad",
  "Whole Kokan Belt",
];

/* ============================================================
   COLORS: he 3 line badalun sagle colors badalta yetat
   ============================================================ */
// Labels (Full Name, Email ...) cha color
const labelClass = "mb-2 block text-sm font-semibold text-slate-800";

// Input / textarea / select: text, placeholder, border
const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

// Input chya aatle icons cha color
const iconClass = "text-gray-500";

// Payment form che input (icon nasto, mhanun pl-10 nahi)
const payInputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Payment states
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "card" | "netbanking"
  >("upi");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // Store the enquiry ID so payment can be linked to the enquiry
  const [enquiryId, setEnquiryId] = useState<string | null>(null);

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numTravelers: 1,
    preferredDistrict: "Whole Kokan Belt",
    travelDates: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "numTravelers" ? Number(value) : value,
    }));
  };

  // Submit enquiry first
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill Name, Email and Message.");
      return;
    }

    setSubmitting(true);

    const enquiryData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      subject: null,
      message: formData.message.trim(),
      status: "new",
      num_travelers: Number(formData.numTravelers) || 1,
      travel_dates: formData.travelDates || "Flexible",
      preferred_district: formData.preferredDistrict || "Whole Kokan Belt",
    };

    console.log("Submitting enquiry:", enquiryData);

    // Save enquiry through a secure database function.
    // This returns only the new enquiry ID, without exposing SELECT access
    // to every visitor's enquiries.
    const { data: enquiry, error } = await supabase.rpc(
      "submit_public_enquiry",
      {
        p_name: enquiryData.name,
        p_email: enquiryData.email,
        p_phone: enquiryData.phone,
        p_subject: enquiryData.subject,
        p_message: enquiryData.message,
        p_status: enquiryData.status,
        p_num_travelers: enquiryData.num_travelers,
        p_travel_dates: enquiryData.travel_dates,
        p_preferred_district: enquiryData.preferred_district,
      }
    );

    setSubmitting(false);

    if (error) {
      console.error("SUPABASE ENQUIRY ERROR:", error);
      alert("Supabase Error: " + error.message);
      return;
    }

    console.log("ENQUIRY SAVED SUCCESSFULLY:", enquiry);

    // Save enquiry ID for payment record
    if (enquiry?.id) {
      setEnquiryId(enquiry.id);
    }

    // Show demo payment after enquiry is saved
    setShowPayment(true);
  };

  // Demo payment + save payment details to Supabase
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enquiryId) {
      alert("Enquiry ID not found. Please try again.");
      return;
    }

    setProcessingPayment(true);

    const demoTransactionId =
      "TALKOKAN-DEMO-" +
      Math.random().toString(36).substring(2, 10).toUpperCase();

    const methodLabel =
      paymentMethod === "upi"
        ? "UPI"
        : paymentMethod === "card"
        ? "Card"
        : "Net Banking";

    console.log("Saving demo payment:", {
      enquiry_id: enquiryId,
      amount: 500,
      payment_method: methodLabel,
      payment_status: "Paid",
      transaction_id: demoTransactionId,
    });

    // Save payment record in Supabase
    const { error } = await supabase.from("payments").insert({
      enquiry_id: enquiryId,
      amount: 500,
      payment_method: methodLabel,
      payment_status: "Paid",
      transaction_id: demoTransactionId,
    });

    setProcessingPayment(false);

    if (error) {
      console.error("SUPABASE PAYMENT ERROR:", error);
      alert("Payment save error: " + error.message);
      return;
    }

    console.log("PAYMENT SAVED SUCCESSFULLY");

    setTransactionId(demoTransactionId);
    setPaymentSuccess(true);
    setSubmittedSuccess(true);
  };

  const handleClose = () => {
    if (submitting || processingPayment) return;

    setSubmittedSuccess(false);
    setShowPayment(false);
    setPaymentSuccess(false);
    setTransactionId("");
    setEnquiryId(null);

    setPaymentMethod("upi");
    setUpiId("");
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");

    setFormData({
      name: "",
      email: "",
      phone: "",
      numTravelers: 1,
      preferredDistrict: "Whole Kokan Belt",
      travelDates: "",
      message: "",
    });

    onClose();
  };

  const paymentButtonClass = (method: "upi" | "card" | "netbanking") =>
    "flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-bold transition " +
    (paymentMethod === method
      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
      : "border-gray-200 text-gray-600 hover:border-emerald-300");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white text-gray-900 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {showPayment ? "Secure Payment" : "Plan Your Kokan Trip"}
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              {showPayment
                ? "Complete your demo booking payment."
                : "Send us your enquiry and we'll help you plan your journey."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting || processingPayment}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* ================= PAYMENT SUCCESS ================= */}
        {paymentSuccess ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle size={46} className="text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Payment Successful!
            </h3>

            <p className="mt-3 max-w-md text-gray-600">
              Your TalKokan booking advance has been successfully recorded in
              demo mode.
            </p>

            <div className="mt-5 w-full max-w-sm rounded-2xl border border-green-200 bg-green-50 p-4 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Paid</span>
                <strong className="text-gray-900">₹500</strong>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-semibold text-green-700 text-xs">
                  {transactionId}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className="font-bold text-green-600">Paid</span>
              </div>
            </div>

            <p className="mt-5 text-xs text-gray-500">
              Demo payment only — no real money has been charged.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-7 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        ) : showPayment ? (
          /* ================= PAYMENT PAGE ================= */
          <div className="p-6">
            <button
              type="button"
              onClick={() => setShowPayment(false)}
              className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600"
            >
              <ArrowLeft size={17} />
              Back to Enquiry
            </button>

            {/* Amount */}
            <div className="mb-6 rounded-2xl bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    BOOKING ADVANCE
                  </p>
                  <p className="mt-1 text-3xl font-extrabold">₹500</p>
                </div>

                <div className="text-right">
                  <ShieldCheck className="ml-auto h-8 w-8 text-amber-400" />
                  <p className="mt-1 text-[10px] text-slate-300">
                    Demo Payment
                  </p>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <h3 className="mb-4 text-sm font-bold text-gray-800">
              Select Payment Method
            </h3>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={paymentButtonClass("upi")}
              >
                <Smartphone size={21} />
                UPI
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={paymentButtonClass("card")}
              >
                <CreditCard size={21} />
                Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={paymentButtonClass("netbanking")}
              >
                <Building2 size={21} />
                Net Banking
              </button>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment} className="space-y-4">
              {/* UPI */}
              {paymentMethod === "upi" && (
                <div>
                  <label className={labelClass}>UPI ID</label>

                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="example@upi"
                    className={payInputClass}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Demo only — no real UPI transaction will happen.
                  </p>
                </div>
              )}

              {/* Card */}
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Card Number</label>

                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className={payInputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Cardholder Name</label>

                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Enter cardholder name"
                      className={payInputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Expiry</label>

                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className={payInputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>CVV</label>

                      <input
                        type="password"
                        required
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="•••"
                        className={payInputClass}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    Demo only — card details are not stored.
                  </p>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div>
                  <label className={labelClass}>Select Bank</label>

                  <select required className={payInputClass}>
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>

                  <p className="mt-2 text-xs text-gray-500">
                    Demo only — no real banking transaction will happen.
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={processingPayment}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg transition hover:from-emerald-500 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processingPayment ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Processing Demo Payment...
                  </>
                ) : (
                  <>
                    <Lock size={17} />
                    Pay ₹500
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
              <CheckCircle size={16} className="text-emerald-500" />
              Demo payment • No real money will be charged
            </div>
          </div>
        ) : submittedSuccess ? (
          /* ================= OLD SUCCESS ================= */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle size={44} className="text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Enquiry Submitted!
            </h3>

            <p className="mt-3 max-w-md text-gray-600">
              Thank you for contacting us. Your Kokan travel enquiry has been
              received successfully.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-7 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        ) : (
          /* ================= ENQUIRY FORM ================= */
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            {/* Name + Email */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Full Name *</label>

                <div className="relative">
                  <User
                    size={18}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email *</label>

                <div className="relative">
                  <Mail
                    size={18}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Phone + Travelers */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Phone Number</label>

                <div className="relative">
                  <Phone
                    size={18}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Number of Travelers</label>

                <div className="relative">
                  <Users
                    size={18}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                  />

                  <input
                    type="number"
                    name="numTravelers"
                    min="1"
                    max="100"
                    value={formData.numTravelers}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* District + Date */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Preferred District</label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                  />

                  <select
                    name="preferredDistrict"
                    value={formData.preferredDistrict}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Travel Dates</label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                  />

                  <input
                    type="text"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    placeholder="e.g. 15-18 December"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>Your Message *</label>

              <div className="relative">
                <MessageSquare
                  size={18}
                  className={`absolute left-3 top-4 ${iconClass}`}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your trip requirements..."
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
