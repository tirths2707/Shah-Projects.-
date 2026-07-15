import { Suspense } from "react";
import OrderConfirmedContent from "./OrderConfirmedContent";

export const metadata = {
  title: "Order confirmed — SnackIt",
};

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
