//* Esto es para agregar un solo documento, por el momento estará comentado
import { Timestamp } from 'firebase/firestore'
import { crearJsonDesdeObjeto } from '../librerias/manipularDatos.js'

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
    precios: {
      contado: 1400,
      crédito: {
        total: 1500,
        cuotas: {
          1: 600,
          2: 500,
          3: 400
        }
      }
    },

    descuentos: {
      excelencia: 0,
      exAlumno: 0
    },

    simulacroCarnet: 120,

    tipo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas',
      4: 'Ciencias'
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
    precios: {
      contado: 1900,
      crédito: {
        total: 2000,
        cuotas: {
          1: 600,
          2: 500,
          3: 500,
          4: 400
        }
      },

      descuentos: {
        excelencia: {
          contado: 1520,
          crédito: {
            total: 1600,
            cuotas: {
              1: 550,
              2: 550,
              3: 500
            }
          }
        },
        exAlumno: 0
      }
    },

    simulacroCarnet: 180,

    tipo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas',
      4: 'Ciencias'
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
    precios: {
      contado: 1500,
      crédito: {
        total: 1600,
        cuotas: {
          1: 600,
          2: 500,
          3: 500
        }
      },

      descuentos: {
        excelencia: {
          contado: 1200,
          crédito: {
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
          crédito: {
            total: 1500,
            cuotas: {
              1: 500,
              2: 500,
              3: 500
            }
          }
        }
      }
    },

    simulacroCarnet: 120,

    tipo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas',
      4: 'Ciencias'
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
    precios: {
      contado: 1000,
      crédito: {
        total: 1100,
        cuotas: {
          1: 400,
          2: 400,
          3: 300
        }
      },

      descuentos: {
        excelencia: 0,
        exAlumno: 0
      }
    },

    simulacroCarnet: 120,

    tipo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas',
      4: 'Ciencias'
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
    precios: {
      contado: 600,
      crédito: {
        total: 700,
        cuotas: {
          1: 400,
          2: 300
        }
      },

      descuentos: {
        excelencia: 0,
        exAlumno: 0
      }
    },

    simulacroCarnet: 10,

    tipo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas',
      4: 'Ciencias'
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

    precios: {
      contado: 600,
      crédito: {
        total: 700,
        cuotas: {
          1: 400,
          2: 300
        }
      },

      descuentos: {
        excelencia: 0,
        exAlumno: 0
      }
    },

    simulacroCarnet: 10,

    tipo: {
      1: 'Ingeniería',
      2: 'Letras',
      3: 'Médicas',
      4: 'Ciencias'
    }
  }

]

crearJsonDesdeObjeto(ciclos)
