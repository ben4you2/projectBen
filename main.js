function viewRequest(index) {
            const request = requests[index];
            Swal.fire({
                title: 'Request Details',
                html: `
                    <p><strong>Name:</strong> ${request.name}</p>
                    <p><strong>Phone:</strong> ${request.phone}</p>
                    <p><strong>Location:</strong> ${request.location}</p>
                    <p><strong>Type:</strong> ${request.type}</p>
                    <p><strong>Description:</strong> ${request.description}</p>
                `,
                confirmButtonText: ` <p style="background-color:#blue;">Close</p>`,
            });
        }
        
 /*

        function deleteRequest(index) {
          requests.splice(index, 1);
          localStorage.setItem('emergencyRequests', JSON.stringify(requests));
          Swal.fire('Deleted!', 'Request removed successfully.', 'success');
          updateTable();
        }
        */
        
        
      const form = document.getElementById('emergencyForm');
        const requestsTable = document.getElementById('requestsTable');
        const notificationCount = document.getElementById('notificationCount');
        const notificationBtn = document.getElementById('notificationBtn');
        let notifications = 0;
        
        const requests = JSON.parse(localStorage.getItem('emergencyRequests')) || [];
        
        function updateTable() {
          requestsTable.innerHTML = '';
          requests.forEach((req, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td class="px-6 py-4">${req.name}</td>
                    <td class="px-6 py-4">${req.phone}</td>
                    <td class="px-6 py-4">${req.location}</td>
                    <td class="px-6 py-4">${req.type}</td>
                    <td class="px-6 py-4">${req.description}</td>
                    <td class="px-6 py-4">
                        <button onclick="viewRequest(${index})" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="deleteRequest(${index})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
            requestsTable.appendChild(row);
          });
        }
        
        
        
        notificationBtn.addEventListener('click', () => {
          notifications = 0;
          notificationCount.textContent = '';
          notificationCount.classList.add('hidden');
          Swal.fire('Notifications', 'You have read all notifications.', 'info');
        });
        
        updateTable();
        
        
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newRequest = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                location: document.getElementById('location').value,
                type: document.getElementById('type').value,
                description: document.getElementById('description').value,
            };
            requests.push(newRequest);
            localStorage.setItem('emergencyRequests', JSON.stringify(requests));
            notifications++;
            notificationCount.textContent = notifications;
            notificationCount.classList.remove('hidden');
            Swal.fire('Success!', 'Request submitted successfully.', 'success');
            updateTable();
            form.reset();
        });
        
        
        