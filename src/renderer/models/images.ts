
export default {
  namespace: 'images',
  state: {
    images: [],
    inputImages: [],
    uploadImages: [],
  },
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload };
    }
  }
}
