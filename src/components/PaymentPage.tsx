import {
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Loader2,
} from 'lucide-react';

interface PaymentPageProps {
  amount?: number;
  onBack: () => void;
  onSuccess: (transactionId: string) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  amount = 500,
  onBack,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);

  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    setProcessing(true);

    // Demo payment simulation
    setTimeout(() => {
      const transactionId =
        'TALKOKAN-DEMO-' +
        Math.random().toString(36).substring(2, 10).toUpperCase();

      setProcessing(false);
      onSuccess(transactionId);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-amber-600 text-sm font-semibold mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Enquiry
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
              <h1 className="text-2xl font-bold">
                Secure Payment
              </h1>
            </div>

            <p className="text-sm text-slate-300">
              Complete your TalKokan trip booking
            </p>
          </div>

          {/* Amount */}
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  BOOKING ADVANCE
                </p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">
                  ₹{amount}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">
                  Payment Type
                </p>
                <p className="text-sm font-bold text-amber-600">
                  Demo Payment
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6">

            <h2 className="text-sm font-bold text-slate-800 mb-4">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-2 mb-6">

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition ${
                  paymentMethod === 'upi'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 text-slate-600 hover:border-amber-300'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                UPI
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 text-slate-600 hover:border-amber-300'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition ${
                  paymentMethod === 'netbanking'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 text-slate-600 hover:border-amber-300'
                }`}
              >
                <Building2 className="w-5 h-5" />
                Net Banking
              </button>

            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment} className="space-y-4">

              {/* UPI */}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="example@upi"
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />

                  <p className="text-[11px] text-slate-500 mt-2">
                    Demo only — no real UPI transaction will be processed.
                  </p>
                </div>
              )}

              {/* Card */}
              {paymentMethod === 'card' && (
                <div className="space-y-3">

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Card Number
                    </label>

                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Cardholder Name
                    </label>

                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Enter cardholder name"
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Expiry
                      </label>

                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        CVV
                      </label>

                      <input
                        type="password"
                        required
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                  </div>

                  <p className="text-[11px] text-slate-500">
                    Demo only — card details are not processed or stored.
                  </p>

                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Select Bank
                  </label>

                  <select
                    required
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>

                  <p className="text-[11px] text-slate-500 mt-2">
                    Demo only — no real banking transaction will be processed.
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 mt-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-60 text-slate-950 font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Demo Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ₹{amount}
                  </>
                )}
              </button>

            </form>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 mt-5 text-[11px] text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Demo payment • No real money will be charged
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};