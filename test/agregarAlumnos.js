//* Esto es para agregar un solo documento, por el momento estará comentado
import { Timestamp } from 'firebase/firestore'
import { agregarArrayDatosColeccionVacia } from '../librerias/manipularDatos.js'
import { db } from '../public/services/firebase/firebase.js'

const ciclos = [
  {
    nombre: 'Anual Continuo (Formativos)',
    inicio: {
      Ciencias: Timestamp.fromDate(new Date(2024, 2, 30, 7, 30, 0, 0)),
      Letras: Timestamp.fromDate(new Date(2024, 3, 3, 7, 30, 0, 0))
    },
    fin: Timestamp.fromDate(new Date(2024, 8, 0, 0, 0, 0, 0)),
    horario: {
      dias: 'Lunes a Sabado',
      hora: '7:30am - 1:00pm + 3 tardes'
    },
    precios:
    [
      {
        nombre: 'Contado',
        total: 1400
      },
      {
        nombre: 'Credito',
        total: 1500,
        cuotas: {
          1: 600,
          2: 500,
          3: 400
        }

      }
    ],

    descuentos: {
      excelencia: 0,
      exAlumno: 0
    },

    simulacroCarnet: 120,

    grupo: {
      1: 'Único'
    }
  },
  {
    nombre: 'Anual Nuevo',
    inicio: Timestamp.fromDate(new Date(2024, 3, 13, 7, 30, 0, 0)),
    fin: Timestamp.fromDate(new Date(2024, 11, 0, 0, 0, 0, 0)),
    horario: {
      dias: 'Lunes a Sabado',
      hora: '7:00am - 1:00pm + 3 tardes (3:00pm - 8:30pm)'
    },
    precios: [
      {
        nombre: 'Contado',
        total: 1900

      },
      {
        nombre: 'Credito',
        total: 2000,
        cuotas: {
          1: 600,
          2: 500,
          3: 500,
          4: 400
        }

      }],

    descuentos: {
      excelencia: {
        contado: 1520,
        credito: {
          total: 1600,
          cuotas: {
            1: 550,
            2: 550,
            3: 500
          }
        }
      },
      exAlumno: 0
    },

    simulacroCarnet: 180,

    grupo: {
      1: 'Único'
    }
  },

  {
    nombre: 'Semestral',
    inicio: Timestamp.fromDate(new Date(2024, 3, 13, 7, 30, 0, 0)),
    fin: Timestamp.fromDate(new Date(2024, 8, 0, 0, 0, 0, 0)),
    horario: {
      dias: 'Lunes a Sabado',
      hora: '7:00am - 1:00pm + 3 tardes (3:00pm - 8:30pm)'
    },
    precios: [
      {
        nombre: 'Contado',
        total: 1500
      }, {
        nombre: 'Credito',
        total: 1600,
        cuotas: {
          1: 600,
          2: 500,
          3: 500
        }
      }
    ],

    descuentos: {
      excelencia: {
        contado: 1200,
        credito: {
          total: 1280,
          cuotas: {
            1: 500,
            2: 400,
            3: 380
          }
        }
      },
      exAlumno: {
        contado: 1400,
        credito: {
          total: 1500,
          cuotas: {
            1: 500,
            2: 500,
            3: 500
          }
        }
      }
    },

    simulacroCarnet: 120,

    grupo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas'
    }
  },

  {
    nombre: 'Semestral Tarde',
    inicio: Timestamp.fromDate(new Date(2024, 3, 17, 15, 0, 0, 0)),
    fin: Timestamp.fromDate(new Date(2024, 8, 0, 0, 0, 0, 0)),
    horario: {
      dias: 'Lunes a Sabado',
      hora: '3:00pm - 8:30pm + 3 tardes, Domingo(Simulacro)'
    },
    precios: [
      {
        nombre: 'Contado',
        total: 1000
      },
      {
        nombre: 'Credito',
        total: 1100,
        cuotas: {
          1: 400,
          2: 400,
          3: 300
        }
      }
    ],

    descuentos: {
      excelencia: 0,
      exAlumno: 0
    },

    simulacroCarnet: 120,

    grupo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas'
    }
  },

  {
    nombre: 'Alfa',
    inicio: Timestamp.fromDate(new Date(2024, 3, 17, 16, 0, 0, 0)),
    fin: Timestamp.fromDate(new Date(2024, 8, 0, 0, 0, 0, 0)),
    horario: {
      dias: 'Interdiario',
      hora: '4:00pm - 8:00pm'
    },
    precios: [
      {
        nombre: 'Contado',
        total: 600
      },
      {
        nombre: 'Credito',
        total: 700,
        cuotas: {
          1: 400,
          2: 300
        }
      }
    ],

    descuentos: {
      excelencia: 0,
      exAlumno: 0
    },

    simulacroCarnet: 10,

    grupo: {
      1: 'Único'
    }
  },

  {
    nombre: 'Paralelo',
    inicio: Timestamp.fromDate(new Date(2024, 3, 24, 15, 0, 0, 0)),
    fin: Timestamp.fromDate(new Date(2024, 7, 0, 0, 0, 0, 0)),
    horario: {
      dias: 'Lunes a Sabado',
      hora: '3:00pm - 9:00pm, Domingo(Simulacro)'
    },

    precios: [
      {
        nombre: 'Contado',
        total: 600
      },
      {
        nombre: 'Credito',
        total: 700,
        cuotas: {
          1: 400,
          2: 300
        }
      }
    ],

    descuentos: {
      excelencia: 0,
      exAlumno: 0
    },

    simulacroCarnet: 10,

    grupo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas'
    }
  }

]

const carreritas = [
  {
    nombre: 'Medicina',
    ciclos: [
      {
        nombre: 'Anual Nuevo',
        grupos: [
          {
            nombre: 'Único'
          }
        ]

      },

      {
        nombre: 'Anual Continuo (Formativos)',
        grupos: [

          {
            nombre: 'Semestral Letras'
          },
          {
            nombre: 'Semestral Ingeniería'
          },
          {
            nombre: 'Semestral Médicas'
          }
        ]

      },
      {
        nombre: 'Semestral',
        grupos: [
          {
            nombre: 'Semestral Médicas'
          }
        ]
      }
    ]
  }

]

// crearJsonDesdeObjeto(ciclos)
// const grupos = recuperarColeccion('grupos')
// console.log(grupos)

agregarArrayDatosColeccionVacia(db, ciclos, 'ciclos', 'ciclo')
// agregarArrayDatosColeccionVacia(db, carreritas, 'carreritas', 'carrera')
