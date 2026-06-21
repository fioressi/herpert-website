"""Backend API tests for HERPERT Landing API"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://erp-hub-56.preview.emergentagent.com').rstrip('/')


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Root info endpoint
class TestRoot:
    def test_root_returns_service_info(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "HERPERT" in data.get("service", "")


# Stats endpoint
class TestStats:
    def test_stats_payload(self, api):
        r = api.get(f"{BASE_URL}/api/stats")
        assert r.status_code == 200
        data = r.json()
        assert data["modules"] == 11
        assert data["part_classes"] == 125
        assert data["languages"] == ["DE", "EN", "HU"]
        assert data["price_per_seat_eur"] == 50


# Leads endpoint - create + list + validation
class TestLeads:
    def test_create_lead_valid(self, api):
        payload = {
            "name": "TEST_Alice",
            "company": "TEST_AcmeGmbH",
            "email": "test_alice@example.com",
            "role": "Konstruktion",
            "message": "Demo bitte"
        }
        r = api.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["company"] == payload["company"]
        assert data["email"] == payload["email"]
        assert data["role"] == payload["role"]
        assert "created_at" in data

    def test_create_lead_minimum_required(self, api):
        payload = {
            "name": "TEST_Bob",
            "company": "TEST_BobCo",
            "email": "test_bob@example.com",
        }
        r = api.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["role"] is None
        assert data["message"] is None
        assert data["email"] == payload["email"]

    def test_create_lead_invalid_email(self, api):
        payload = {
            "name": "TEST_BadEmail",
            "company": "TEST_Co",
            "email": "not-an-email",
        }
        r = api.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 422

    def test_create_lead_missing_fields(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json={})
        assert r.status_code == 422
        # Missing only some
        r2 = api.post(f"{BASE_URL}/api/leads", json={"name": "X"})
        assert r2.status_code == 422

    def test_list_leads_default(self, api):
        r = api.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 2  # we created 2 above
        # ensure recent first - first item created_at >= last
        if len(data) >= 2:
            assert data[0]["created_at"] >= data[-1]["created_at"]
        # _id should not leak
        for item in data:
            assert "_id" not in item

    def test_list_leads_with_limit(self, api):
        r = api.get(f"{BASE_URL}/api/leads?limit=1")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) <= 1

    def test_create_lead_persistence_via_get(self, api):
        unique_email = "test_persist_check@example.com"
        payload = {"name": "TEST_Persist", "company": "TEST_PersCo", "email": unique_email}
        rc = api.post(f"{BASE_URL}/api/leads", json=payload)
        assert rc.status_code == 200
        rl = api.get(f"{BASE_URL}/api/leads?limit=50")
        assert rl.status_code == 200
        emails = [x["email"] for x in rl.json()]
        assert unique_email in emails
