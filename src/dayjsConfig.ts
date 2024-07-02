import dayjs, { extend } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

extend(utc);
extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export default dayjs;
