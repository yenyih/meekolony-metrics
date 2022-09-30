import Vue from "vue";
import humanizeDuration from "humanize-duration";

export default () => {
  Vue.filter("currency", function(payload) {
    return payload / 10**9;
  });
  Vue.filter("oneDecimal", function(payload) {
    return payload.toFixed(1);
  });
  Vue.filter("twoDecimal", function(payload) {
    return payload.toFixed(2);
  });
  Vue.filter("shortAddress", function(payload) {
    if (!payload) return "";
    return `${payload.slice(0, 5)} ... ${payload.slice(payload.length - 3)}`;
  });
  Vue.filter("duration", function(value) {
    if (value) {
      const duration = (new Date().getTime() - new Date(value).getTime());
      const language = "en";
      if (duration > 0) {
        return `${humanizeDuration(duration, {
          language,
          largest: 2,
          round: true,
          units: ["y", "mo", "w", "d", "h", "m", "s"]
        })} ago`;
      }
      return `in ${humanizeDuration(duration, {
        language,
        largest: 2,
        round: true,
        units: ["y", "mo", "w", "d", "h", "m", "s"]
      })}`;
    }
    return "-";
  });
}
