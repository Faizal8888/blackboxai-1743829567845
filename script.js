// Initialize Three.js for 3D elements
function init3DElements() {
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        const container = document.getElementById('3d-container');
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Create a 3D object (rotating cube with gold accents)
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            emissive: 0x111111,
            specular: 0xFFD700,
            shininess: 100,
            transparent: true,
            opacity: 0.8,
            wireframe: false
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Position camera
        camera.position.z = 5;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    } else {
        console.warn('Three.js not loaded - skipping 3D initialization');
    }
}

// Enhanced Chatbot Functionality
function initChatbot() {
    const chatbotWidget = document.getElementById('chatbot-widget');
    if (!chatbotWidget) return;

    let chatOpen = false;
    const chatContainer = document.createElement('div');
    chatContainer.className = 'fixed bottom-24 right-8 w-80 h-96 bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl flex flex-col hidden';
    chatContainer.style.border = '1px solid rgba(255, 215, 0, 0.3)';
    chatContainer.innerHTML = `
        <div class="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 class="font-bold text-lg gold-accent">ALFAZAL Assistant</h3>
            <button id="close-chat" class="text-slate-400 hover:text-white">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div id="chat-messages" class="flex-1 p-4 overflow-y-auto"></div>
        <div class="p-4 border-t border-slate-700">
            <input type="text" id="chat-input" placeholder="Type your message..." 
                   class="w-full bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
        </div>
    `;
    document.body.appendChild(chatContainer);

    chatbotWidget.addEventListener('click', () => {
        chatOpen = !chatOpen;
        if (chatOpen) {
            chatContainer.classList.remove('hidden');
            document.getElementById('chat-input').focus();
            addBotMessage("Hello! I'm your ALFAZAL assistant. How can I help you today?");
        } else {
            chatContainer.classList.add('hidden');
        }
    });

    document.getElementById('close-chat')?.addEventListener('click', () => {
        chatOpen = false;
        chatContainer.classList.add('hidden');
    });

    document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addUserMessage(e.target.value);
            // Simulate bot response
            setTimeout(() => {
                addBotMessage("Thanks for your message! Our team will get back to you soon.");
            }, 1000);
            e.target.value = '';
        }
    });

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'mb-4 flex justify-end';
        messageDiv.innerHTML = `
            <div class="max-w-xs bg-cyan-600 text-white rounded-lg p-3">
                ${text}
            </div>
        `;
        document.getElementById('chat-messages').appendChild(messageDiv);
        scrollChatToBottom();
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'mb-4 flex justify-start';
        messageDiv.innerHTML = `
            <div class="max-w-xs bg-slate-700 text-white rounded-lg p-3">
                ${text}
            </div>
        `;
        document.getElementById('chat-messages').appendChild(messageDiv);
        scrollChatToBottom();
    }

    function scrollChatToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Analytics Dashboard Functions
function initAnalytics() {
    if (window.location.pathname.includes('analytics.html')) {
        // Load Chart.js if available
        if (typeof Chart !== 'undefined') {
            // Sample data for the charts
            const visitorsData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Visitors',
                    data: [1200, 1900, 1700, 2100, 2300, 2500],
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    borderColor: 'rgba(0, 255, 255, 1)',
                    borderWidth: 2,
                    tension: 0.4
                }]
            };

            const engagementData = {
                labels: ['<1 min', '1-3 min', '3-5 min', '5-10 min', '>10 min'],
                datasets: [{
                    label: 'Engagement Time',
                    data: [15, 30, 25, 20, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderWidth: 1
                }]
            };

            // Create charts
            new Chart(document.getElementById('visitors-chart'), {
                type: 'line',
                data: visitorsData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#fff'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#fff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#fff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });

            new Chart(document.getElementById('engagement-chart'), {
                type: 'doughnut',
                data: engagementData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#fff'
                            }
                        }
                    }
                }
            });
        }

        // Simulate real-time updates
        setInterval(() => {
            const visitorsNow = document.getElementById('visitors-now');
            if (visitorsNow) {
                visitorsNow.textContent = Math.floor(Math.random() * 50) + 150;
            }
        }, 3000);
    }
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                const yPos = -(scrollPosition * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load Three.js dynamically if needed
    if (!window.THREE && document.getElementById('3d-container')) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = init3DElements;
        document.head.appendChild(script);
    } else {
        init3DElements();
    }

    initChatbot();
    initAnalytics();
    initParallax();

    // Initialize all tooltips
    if (window.tippy) {
        tippy('[data-tippy-content]', {
            theme: 'light-border',
            animation: 'scale',
            duration: 200,
            arrow: true
        });
    }
});

// Export functions for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init3DElements,
        initChatbot,
        initAnalytics,
        initParallax
    };
}