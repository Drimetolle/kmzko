module.exports = () => {
  return JSON.parse(
    `[
      {
          "id": 0,
          "name": "Конвейер ленточный",
          "type": "tape",
          "img": "https://picsum.photos/300/200",
          "nodes": [
              {
                  "id": 0,
                  "name": "Лента",
                  "details": [
                      {
                          "id": 0,
                          "name": "Конвейерная лента",
                          "characteristics": [
                              {
                                  "id": 0,
                                  "name": "Ширина ленты",
                                  "value": "2",
                                  "mark": "tape-width",
                                  "type": "meter"
                              },
                              {
                                  "id": 0,
                                  "name": "Длина ленты",
                                  "value": "50",
                                  "mark": "tape-length",
                                  "type": "meter"
                              }
                          ]
                      }
                  ]
              },
              {
                  "id": 1,
                  "name": "Приводная станция",
                  "details": [
                      {
                          "id": 0,
                          "name": "Приводной барабан",
                          "characteristics": [
                              {
                                  "id": 0,
                                  "name": "Ширина ленты",
                                  "value": "530",
                                  "mark": "",
                                  "type": "meter"
                              }
                          ]
                      },
                      {
                          "id": 1,
                          "name": "Барабан отклоняющий",
                          "characteristics": [
                              {
                                  "id": 0,
                                  "name": "Ширина ленты",
                                  "value": "325",
                                  "mark": "",
                                  "type": "meter"
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      {
          "id": 1,
          "name": "Конвейер ленточный 2",
          "type": null,
          "nodes": [
              {
                  "id": 1,
                  "name": "Лента",
                  "details": [
                      {
                          "id": 1,
                          "name": "Конвейерная лента",
                          "characteristics": [
                              {
                                  "id": 1,
                                  "name": "Ширина ленты",
                                  "value": "2",
                                  "mark": "tape-width",
                                  "type": "meter"
                              },
                              {
                                  "id": 1,
                                  "name": "Длина ленты",
                                  "value": "50",
                                  "mark": "tape-length",
                                  "type": "meter"
                              }
                          ]
                      }
                  ]
              }
          ]
      }
  ]`
  )
}
