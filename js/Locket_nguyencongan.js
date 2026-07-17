// ========== Xử lý response RevenueCat - Locket Gold ========== //
// @nguyencongan

// Bản đồ User-Agent -> [Entitlement ID, Product ID]
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// Lấy User-Agent từ request
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";

// Parse response body
var obj = JSON.parse($response.body);

// Tạo cấu trúc subscriber nếu chưa có
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

// Thông báo (tuỳ chọn)
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Dữ liệu subscription giả (dành cho product)
var fakeSubscription = {
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
var goldEntitlement = {
  grace_period_expires_date: null,
  purchase_date: "2005-05-25T01:04:17Z",
  product_identifier: "com.nguyencongan.premium.yearly",  // ĐÚNG field name
  expires_date: "2099-12-18T01:04:17Z"
};

// Tìm mapping khớp với User-Agent
var match = Object.keys(mapping).find(function(key) {
  return ua.includes(key);
});

if (match) {
  var entId = mapping[match][0];
  var prodId = mapping[match][1] || "com.nguyencongan.premium.yearly";
  obj.subscriber.subscriptions[prodId] = fakeSubscription;
  obj.subscriber.entitlements[entId] = goldEntitlement;
} else {
  // Mặc định nếu không match
  obj.subscriber.subscriptions["com.nguyencongan.premium.yearly"] = fakeSubscription;
  obj.subscriber.entitlements["Gold"] = goldEntitlement;
}

// Đảm bảo có active_subscriptions (nếu cần)
if (!obj.subscriber.active_subscriptions) {
  obj.subscriber.active_subscriptions = ["com.nguyencongan.premium.yearly"];
} else if (obj.subscriber.active_subscriptions.indexOf("com.nguyencongan.premium.yearly") === -1) {
  obj.subscriber.active_subscriptions.push("com.nguyencongan.premium.yearly");
}

// Trả về body đã sửa
$done({ body: JSON.stringify(obj) });
