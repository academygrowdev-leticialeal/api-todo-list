import express from "express";
import { body, param } from "express-validator";

import { ExamplesController } from "../controllers";
import { dataValidation } from "../middlewares";

export class ExampleRoutes {
    public static bind() {
        const router = express.Router();
        const controller = new ExamplesController();

        router.get("/health", (_: express.Request, res: express.Response) => {
            res.status(200).json({ status: "ok" });
        });

        // Public route without authentication
        router.get("/examples", controller.listExamples);


        // Protected routes with authentication
        // Example of a POST route with various validation rules
        router.post(
            "/examples",
            // authMiddleware,
            dataValidation([
                body("fieldString").isString().isLength({ min: 1 }),
                body("fieldNumber").isNumeric().isInt({ min: 0 }),
                body("fieldBoolean").isBoolean(),

                // array of strings
                body("fieldArray").isArray(),
                body("fieldArray.*").isString(),

                // nested object
                body("fieldObject").isObject(),
                body("fieldObject.nestedField1").isString().isLength({ min: 1 }),
                body("fieldObject.nestedField2").isNumeric().isInt({ min: 0 }),

                // optional fields
                body("fieldOptional").optional().isString(),

                // custom validation
                body("fieldCustom").custom((value: any) => {
                    if (value !== "validValue") {
                        throw new Error("fieldCustom must be 'validValue'");
                    }
                    return true;
                }),
            ]),
            controller.createExample,
        );

        // Example of a GET route with path parameter validation
        router.get(
            "/examples/:id",
            // authMiddleware,
            dataValidation([param("id").isNumeric().isInt({ min: 1 })]),
            controller.findExample,
        );

        // Example of a PUT route with both path parameter and body validation
        router.put(
            "/examples/:id",
            // authMiddleware,
            dataValidation([
                param("id").isNumeric().isInt({ min: 1 }),
                body("fieldOptional").optional().isString(),
            ]),
            controller.updateExample,
        );

        // Example of a DELETE route with path parameter validation
        router.delete(
            "/examples/:id",
            // authMiddleware,
            dataValidation([param("id").isNumeric().isInt({ min: 1 })]),
            controller.deleteExample,
        );

        return router;
    }
}
