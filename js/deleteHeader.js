// ========== Xóa Header xác thực ========== //
// @nguyencongan

delete $request.headers["Authorization"];
delete $request.headers["authorization"];
delete $request.headers["X-Platform"];
delete $request.headers["x-platform"];

$done({
  headers: $request.headers,
  body: $request.body || "{}"
});
