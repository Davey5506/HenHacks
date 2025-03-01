from flask import Flask, request, jsonify
from flask import CORS  # Import the CORS library
import gemini_interface

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        # Get the image data from the request
        image_data = request.get_json().get('image')

        # Process the image data (replace with your actual image processing logic)
        result = gemini_interface.main(image_data) # Placeholder

        # Return the result as JSON
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)