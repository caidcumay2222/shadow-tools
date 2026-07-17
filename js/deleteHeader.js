// ========== Xóa Header xác thực RevenueCat ========== //
// @nguyencongan

// Xóa các header xác thực
delete $request.headers["Authorization"];
delete $request.headers["authorization"];
delete $request.headers["X-Platform"];
delete $request.headers["x-platform"];
delete $request.headers["X-RevenueCat-API-Key"];
delete $request.headers["x-revenuecat-api-key"];

// Giữ nguyên body (nếu có)
var body = $request.body || "{}";

$done({
  headers: $request.headers,
  body: body
});
