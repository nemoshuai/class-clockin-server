axios.interceptors.response.use(
  response => response.data || {},
  error => {
    const { response } = error;
    if (response) {
      const { status, data, config } = response;
      if (data) {
        const { msg } = data;
        if (!msg) return Promise.reject(data);
        console.log('msg', msg);

      }
    }
    return Promise.reject(error);
  }
)

document.getElementsByClassName('btn')[0].onclick = () => {
  axios.get('/api/openinfo', {
    params: {
      code: ' 001PCADD07bsak21itCD0PiIDD0PCADa'
    }
  }).then(result=>{
    console.log('result:', result);
  }).catch(error => {
    console.log('fetch game error',error);
  })
}