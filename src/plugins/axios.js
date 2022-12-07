// axios
import axios from "axios";

// i18n
import i18n from "./i18n";

// axios config
axios.defaults.baseURL = "api_url";
axios.defaults.headers.common["lang"] = i18n.locale;

export default axios;
