const mocks = {
    'auth': { POST: { token: 'This-is-a-mocked-token' } },
    'user/me': { GET: { name: 'doggo', title: 'sir' } },
    'f': {},
};

const apiCall = ({ url, method }: any) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // resolve(mocks[url][method || 'GET']);
                // console.log(`Mocked '${url}' - ${method || 'GET'}`);
                // console.log('response: ', mocks[url][method || 'GET']);
            } catch (err) {
                reject(new Error(err));
            }
        }, 100);
    });

export default apiCall;