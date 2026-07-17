// ========= Xóa Header xác thực ========= //
// @nguyencongan

let obj = JSON.parse($request.body);

// Xóa các header xác thực để bypass RevenueCat
delete $request.headers["Authorization"];
delete $request.headers["X-Platform"];
delete $request.headers["x-platform"];

$done({
  headers: $request.headers,
  body: JSON.stringify(obj)
});
