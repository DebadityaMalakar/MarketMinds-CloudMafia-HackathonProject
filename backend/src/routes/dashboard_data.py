from flask import Blueprint, Response, current_app,jsonify
import json

dashboard_bp = Blueprint("dashboard_data", __name__)

@dashboard_bp.route("/dashboard-data", methods=["GET"])
def dashboard_data():
    """
    Return all documents from the 'analytics' collection with pretty JSON formatting.
    """
    try:
        collection = current_app.mongo.db.analytics
        docs = []
        for doc in collection.find():
            doc["_id"] = str(doc.get("_id"))
            docs.append(doc)

        pretty_json = json.dumps({"data": docs}, indent=4, sort_keys=True, default=str)
        return Response(pretty_json, mimetype='application/json'), 200

    except Exception as e:
        current_app.logger.exception("Failed to fetch dashboard data: %s", e)
        return jsonify({"message": "Internal Server Error"}), 500
