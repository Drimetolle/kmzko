module.exports = () => {
  return JSON.parse(
    `[
      {
        "id": 1,
          "name": "Управление",
          "value": "",
          "child": [
              {
                  "id": 1,
                  "name": "Шкаф1"
              },
              {
                  "id": 2,
                  "name": "Шкаф2"
              },
              {
                  "id": 3,
                  "name": "Шкаф3"
              }
          ]
      },
      {
        "id": 2,
          "name": "Управление2",
          "value": "",
          "child": [
              {
                  "id": 1,
                  "name": "Шкаф1"
              },
              {
                  "id": 2,
                  "name": "Шкаф2"
              },
              {
                  "id": 3,
                  "name": "Шкаф3"
              }
          ]
      },
      {
        "id": 3,
          "name": "Покраска",
          "value": "#666"
      },
      {
        "id": 4,
          "name": "Что-то",
          "value": true
      }
  ]`
  )
}
