//  HERE IS OUR FRONT END JAVASCRIPT

const form = document.getElementById('vote-form');

//FORM SUBMIT EVENT
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {
        os: choice
    };

    //to send post req we use fetch
    //THIS WILL GET DATA FROM POST METHOD OF POOL.JS
    fetch('http://localhost:3000/poll', {
            method: 'post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })

        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    e.preventDefault();
});

// THIS TARGET GET REQUEST
fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
            // console.log(data);
            const votes = data.votes;
            const totalVotes = votes.length;
            //COUNT VOTE POINTS
            const voteCounts = votes.reduce((acc, vote) => (
                (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
                {}
            );
            // const voteCounts = votes.reduce(acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc), {});



        let dataPoints = [{
                label: 'Windows',
                y: voteCounts.Windows
            },
            {
                label: 'MacOS',
                y: voteCounts.MacOS
            },
            {
                label: 'Linux',
                y: voteCounts.Linux
            },
            {
                label: 'Others',
                y: voteCounts.Others
            }
        ];


        const chartContainer = document.querySelector('#chartContainer');

        if (chartContainer) {
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: `Total Votes ${totalVotes}`
                },
                data: [{
                    type: 'column',
                    dataPoints: dataPoints
                }]
            });
            chart.render();

            // https://dashboard.pusher.com/apps/709936/getting_started
            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;

            var pusher = new Pusher('b976189345ad44e8dfb4', {
                cluster: 'ap2',
                forceTLS: true
            });

            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function (data) {
                dataPoints = dataPoints.map(x => {
                    if (x.label == data.os) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                });
                chart.render();
            });
        }
    });