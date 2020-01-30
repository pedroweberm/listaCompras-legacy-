import {create} from 'apisauce';

const api = create({
  baseURL:
    'https://www.googleapis.com/customsearch/v1?key=AIzaSyCGRMf4UBYKH8UhWgztXjM3jWOQ77y_alQ&cx=010458422896989056811:ilfntluqibn&num=1&searchType=image&q=',
});

export const getImage = async imageQuery => {
  const apiResponse = await api.get(imageQuery);

  const image = apiResponse.data.items[0].link;

  return image;
};
