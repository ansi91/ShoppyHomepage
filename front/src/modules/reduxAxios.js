import axios from 'axios';

/** GET Method */
export async function axiosGet({url}){
  let result = null;
  try {
    result = await axios.get(url)
                        .then(res => res.data);
  } catch (error) {}

  return result;
}

/** POST Method */
export async function axiosPost({url, data}){
  let result = null;

  try {
    result = await axios({
      method : 'post',
      url : url,
      data : data  
    }).then(res => res.data);   
  } catch (error) {}

  return result;    
}
