# REST APIs for Activity Manager

## Setup

```
# Installation
npm install -g json-server

# Run JSON Server
json-server --watch db.json --routes routes.json --port 8000
```

## API Reference
```http
  BASE_URL = http://localhost:8000/api
```

#### Get All Activities

```http
  Method: GET
  Endpoint: /get-all-activities
```

<table>
  <thead>
    <tr>
    <!-- table headers -->
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
        <!-- response -->
[
    {
        "id": 1,
        "title": "Activity 1",
        "description": "Description 1",
        "isComplete": false
    },
    {
        "id": 2,
        "title": "Activity 2",
        "description": "Description 2",
        "isComplete": true
    },
    {
        "id": 3,
        "title": "Activity 3",
        "description": "Description 3",
        "isComplete": false
    },
    {
        "id": 4,
        "title": "Activity 4",
        "description": "Description 4",
        "isComplete": true
    },
    {
        "title": "Activity 5",
        "description": "Description 5",
        "isComplete": false,
        "id": 5
    },
    {
        "title": "Activity 6",
        "description": "Description 6",
        "isComplete": true,
        "id": 6
    },
    {
        "title": "Activity 7",
        "description": "Description 7",
        "isComplete": false,
        "id": 7
    },
    {
        "title": "Activity 8",
        "description": "Description 8",
        "isComplete": true,
        "id": 8
    }
]
        </pre>
      </td>
    </tr>
  </tbody>
</table>


#### Add an Activity

```http
  Method: POST
  Endpoint: /add-activity
```

<table>
  <thead>
    <tr>
    <!-- table headers -->
      <th>Request</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
        <!-- request -->
{
  "title": "Activity 1",
  "description": "Description 1",
  "isComplete": false
}
        </pre>
      </td>
      <td>
        <pre>
        <!-- response -->
{
    "title": "Activity 1",
    "description": "Description 1",
    "isComplete": false,
    "id": 1
}
        </pre>
      </td>
    </tr>
  </tbody>
</table>

#### Update Status of an Activity

```http
  Method: PATCH
  Endpoint: /update-activity-status/:id
```

<table>
  <thead>
    <tr>
    <!-- table headers -->
      <th>Request</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
        <!-- request -->
{
  "isComplete": true
}
        </pre>
      </td>
      <td>
        <pre>
        <!-- response -->
{
    "id": 1,
    "title": "Activity 1",
    "description": "Description 1",
    "isComplete": true
}
        </pre>
      </td>
    </tr>
  </tbody>
</table>

#### Delete an Activity

```http
  Method: Delete
  Endpoint: /delete-activity/:id
```

<table>
  <thead>
    <tr>
    <!-- table headers -->
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
        <!-- response -->
{}
        </pre>
      </td>
    </tr>
  </tbody>
</table>
