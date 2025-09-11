package jsend

import "github.com/gofiber/fiber/v2"

type JsendSuccessResponse struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

type JsendErrorResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type JsendFailResponse struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data" nullable:"true"`
}

func Success(key string, data interface{}) JsendSuccessResponse {
	value := fiber.Map{key: data}

	if data == nil {
		value = nil
	}

	return JsendSuccessResponse{
		Status: "success",
		Data:   value,
	}
}

func Error(message string) JsendErrorResponse {
	return JsendErrorResponse{
		Status:  "error",
		Message: message,
	}
}

func Fail(data interface{}) JsendFailResponse {
	return JsendFailResponse{
		Status: "fail",
		Data:   data,
	}
}
