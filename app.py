from flask import Flask, render_template, request, jsonify
import random
from datetime import datetime, timedelta

app = Flask(__name__)

# Simulated tracking data (in a real app, this would be a database)
tracking_data = {
    'CRG001': {
        'status': 'Delivered',
        'origin': 'New York, NY',
        'destination': 'Los Angeles, CA',
        'current_location': 'Los Angeles, CA',
        'estimated_delivery': '2024-01-15',
        'actual_delivery': '2024-01-14',
        'history': [
            {'date': '2024-01-14 14:30', 'status': 'Delivered', 'location': 'Los Angeles, CA'},
            {'date': '2024-01-14 08:00', 'status': 'Out for Delivery', 'location': 'Los Angeles, CA'},
            {'date': '2024-01-13 22:00', 'status': 'Arrived at Facility', 'location': 'Los Angeles, CA'},
            {'date': '2024-01-12 10:00', 'status': 'Shipped', 'location': 'Phoenix, AZ'},
            {'date': '2024-01-11 15:00', 'status': 'Picked Up', 'location': 'New York, NY'}
        ]
    },
    'CRG002': {
        'status': 'In Transit',
        'origin': 'Chicago, IL',
        'destination': 'Miami, FL',
        'current_location': 'Atlanta, GA',
        'estimated_delivery': '2024-01-20',
        'actual_delivery': None,
        'history': [
            {'date': '2024-01-16 11:00', 'status': 'In Transit', 'location': 'Atlanta, GA'},
            {'date': '2024-01-15 18:00', 'status': 'Departed Facility', 'location': 'Nashville, TN'},
            {'date': '2024-01-15 09:00', 'status': 'Arrived at Facility', 'location': 'Nashville, TN'},
            {'date': '2024-01-14 14:00', 'status': 'Shipped', 'location': 'Chicago, IL'},
            {'date': '2024-01-14 10:00', 'status': 'Picked Up', 'location': 'Chicago, IL'}
        ]
    },
    'CRG003': {
        'status': 'Processing',
        'origin': 'Seattle, WA',
        'destination': 'Denver, CO',
        'current_location': 'Seattle, WA',
        'estimated_delivery': '2024-01-22',
        'actual_delivery': None,
        'history': [
            {'date': '2024-01-17 09:00', 'status': 'Label Created', 'location': 'Seattle, WA'},
            {'date': '2024-01-17 08:30', 'status': 'Order Received', 'location': 'Seattle, WA'}
        ]
    }
}

def generate_tracking_number():
    """Generate a random tracking number"""
    return 'CRG' + str(random.randint(100, 999))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        # In a real app, you'd save this to a database or send email
        # For now, we'll just show a success message
        return render_template('contact.html', success=True, name=name)
    
    return render_template('contact.html', success=False)

@app.route('/track')
def track():
    return render_template('track.html')

@app.route('/api/track', methods=['POST'])
def api_track():
    data = request.get_json()
    tracking_number = data.get('tracking_number', '').upper()
    
    if not tracking_number:
        return jsonify({'error': 'Please enter a tracking number'}), 400
    
    if tracking_number in tracking_data:
        return jsonify(tracking_data[tracking_number])
    else:
        # Generate demo tracking for any number
        status_options = ['Processing', 'In Transit', 'Out for Delivery', 'Delivered']
        cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']
        
        demo_data = {
            'status': random.choice(status_options),
            'origin': random.choice(cities),
            'destination': random.choice([c for c in cities if c != cities[0]]),
            'current_location': random.choice(cities),
            'estimated_delivery': (datetime.now() + timedelta(days=random.randint(1, 7))).strftime('%Y-%m-%d'),
            'actual_delivery': None,
            'history': [
                {'date': datetime.now().strftime('%Y-%m-%d %H:%M'), 
                 'status': 'Package information updated', 
                 'location': random.choice(cities)}
            ]
        }
        return jsonify(demo_data)

if __name__ == '__main__':
    app.run(debug=True)
