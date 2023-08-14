   const fetchButton = document.getElementById('fetch-button');
        const clickCount = document.getElementById('click-count');
        const resultsDiv = document.getElementById('results');

        let apiCallCount = 0;
        let lastApiCallTime = 0;
        let timerId;

        fetchButton.addEventListener('click', () => {
            apiCallCount++;

            const currentTime = Date.now();
            if (currentTime - lastApiCallTime >= 1000) {
                apiCallCount = 1;
                lastApiCallTime = currentTime;
            }

            if (apiCallCount > 5) {
                alert('Too many API calls. Please wait and try again.');
                return;
            }

            lastApiCallTime = currentTime;

            clickCount.textContent = apiCallCount;
            
            fetchData()
                .then(data => {
                    resultsDiv.textContent = JSON.stringify(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });

        function fetchData() {
            return fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => response.json());
        }

        function resetClickCount() {
            apiCallCount = 0;
            clickCount.textContent = apiCallCount;
        }

        fetchButton.addEventListener('click', () => {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(resetClickCount, 10000);
        });