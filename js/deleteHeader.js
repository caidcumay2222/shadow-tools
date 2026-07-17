// ========== Xóa Header xác thực RevenueCat ========== //
// @nguyencongan

// Parse request body (nếu có)
var obj = {};
try {
  obj = JSON.parse($request.body);
} catch (e) {
  // Không có body hoặc body không hợp lệ
}

// Xóa các header xác thực
delete $request.headers["Authorization"];
delete $request.headers["authorization"];
delete $request.headers["X-Platform"];
delete $request.headers["x-platform"];
delete $request.headers["X-Platform"]; // dự phòng viết hoa

// Trả về request đã chỉnh sửa (giữ nguyên body)
$done({
  headers: $request.headers,
  body: JSON.stringify(obj)
});
