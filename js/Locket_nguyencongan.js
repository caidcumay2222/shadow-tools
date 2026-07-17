// ========== Xử lý response RevenueCat ========== //
// @nguyencongan - Bypass Locket Gold

// Bản đồ User-Agent -> Entitlement ID và Product ID
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// Đọc User-Agent từ request
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";

// Parse response body
var obj = JSON.parse($response.body);

// Đảm bảo obj.subscriber tồn tại
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

// Thêm thông báo (tùy chọn)
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Dữ liệu subscription giả
var nguyencongan = {
  is_sandbox: 1,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2005-05-25T01:04:18Z",
  purchase_date: "2005-05-25T01:04:17Z",
  store: "app_store"
};

// Dữ liệu entitlement Gold
var gold_data = {
  grace_period_expires_date: null,
  purchase_date: "2005-05-25T01:04:17Z",
  product_identifier: "com.nguyencongan.premium.yearly", // ĐÚNG field name
  expires_date: "2099-12-18T01:04:17Z"
};

// Tìm mapping khớp với User-Agent
var match = Object.keys(mapping).find(function(e) {
  return ua.includes(e);
});

if (match) {
  var entry = mapping[match];
  var entitlementId = entry[0];
  var productId = entry[1] || "com.nguyencongan.premium.yearly";
  
  // Gán subscription với productId
  obj.subscriber.subscriptions[productId] = nguyencongan;
  // Gán entitlement
  obj.subscriber.entitlements[entitlementId] = gold_data;
} else {
  // Mặc định
  obj.subscriber.subscriptions["com.nguyencongan.premium.yearly"] = nguyencongan;
  obj.subscriber.entitlements["Gold"] = gold_data;
}

// Trả về body đã sửa
$done({ body: JSON.stringify(obj) });
