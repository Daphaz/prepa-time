import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

const apiGet = (request, params) => {
	if (params) {
		return api.get(request, {
			params,
		});
	}
	return api.get(request);
};

const apiPost = (request, datas) => {
	return api.post(request, datas);
};

const apiPut = (request, datas) => {
	return api.put(request, datas);
};

const apiDelete = (request, datas) => {
	return api.delete(request, {
		data: datas,
	});
};

export { apiGet, apiPost, apiPut, apiDelete };

export default api;
