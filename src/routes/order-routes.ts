import { Router } from "express";
import { cancelOrder, getOrder, listStallQueue, listStudentOrders, placeOrder, updateOrderStatus } from "../controllers/order-controller";
import { validateRequest } from "../validations/validation";
import { createOrderSchema, orderIdParamsSchema, stallIdParamsSchema, studentIdParamsSchema, updateOrderStatusSchema } from "../validations/order-validation";

export const orderRouter = Router();

orderRouter.post("/", validateRequest(createOrderSchema), placeOrder);
orderRouter.get("/students/:studentId", validateRequest(studentIdParamsSchema, "params"), listStudentOrders);
orderRouter.get("/stalls/:stallId/queue", validateRequest(stallIdParamsSchema, "params"), listStallQueue);
orderRouter.get("/:orderId", validateRequest(orderIdParamsSchema, "params"), getOrder);
orderRouter.patch("/:orderId/status", validateRequest(orderIdParamsSchema, "params"), validateRequest(updateOrderStatusSchema), updateOrderStatus);
orderRouter.patch("/:orderId/cancel", validateRequest(orderIdParamsSchema, "params"), cancelOrder);