// https://tahazsh.com/vuebyte-change-page-title

function getTitle(vm) {
	const { title } = vm.$options;
	if (title) {
		return typeof title === "function" ? title.call(vm) : title;
	}
}

export default {
	created() {
		const title = getTitle(this);
		document.title = title || "Face Masks";
	}
};
