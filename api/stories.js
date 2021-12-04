import dynamicAPI from './dynamicAPI'

const url = '/api/stories'

export const getStories = async () => await dynamicAPI('get', `${url}/get`, {})

export const addStory = async (obj) =>
  await dynamicAPI('post', `${url}/post`, obj)

export const updateStory = async (obj) =>
  await dynamicAPI('put', `${url}/update/${obj._id}`, obj)

export const deleteStory = async (id) =>
  await dynamicAPI('delete', `${url}/delete/${id}`, {})

export const getUserStories = async (obj) =>
  await dynamicAPI('get', `${url}/user/${obj._id}`, {})

export const getMyStories = async (obj) =>
  await dynamicAPI('get', `${url}/profile/${obj._id}`, {})

export const updateStoryLike = async (obj) =>
  await dynamicAPI('put', `${url}/like/${obj._id}`, {})

export const getPublicStories = async () =>
  await dynamicAPI('get', `${url}/get-all`, {})
