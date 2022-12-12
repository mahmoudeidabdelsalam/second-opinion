// axios
import axios from "axios";

// i18n
import i18n from "./i18n";

// axios config
axios.defaults.baseURL = "https://staging.drhealthclinics.com/api/";
axios.defaults.headers.common["Accept-Language"] = i18n.locale;

export default axios;
