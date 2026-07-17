// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// ========= Phân cổ định ========= //
// @nguyencongan
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"], 
    obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

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

var gold_data = {
  grace_period_expires_date: null,
  purchase_date: "2005-05-25T01:04:17Z",
  product_identifiers: "com.nguyencongan.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    gold_data.product_identifiers = s;
    obj.subscriber.subscriptions[s] = nguyencongan;
  } else {
    obj.subscriber.subscriptions["com.nguyencongan.premium.yearly"] = nguyencongan;
  }
  obj.subscriber.entitlements[e] = gold_data;
} else {
  obj.subscriber.subscriptions["com.nguyencongan.premium.yearly"] = nguyencongan;
  obj.subscriber.entitlements["Gold"] = gold_data;
}

$done({body: JSON.stringify(obj)});
