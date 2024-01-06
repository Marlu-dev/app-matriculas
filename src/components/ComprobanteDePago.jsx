import React, { useEffect, useState } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer'
import { db } from '../../public/services/firebase/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import logo from '../style/img/logo.jpg'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: '1px solid black'
  },

  grupo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    marginBottom: 5
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica',
    color: '#000',
    textDecoration: 'none',
    padding: 10,
    border: '1px solid black'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: '#000',
    textDecoration: 'none',
    padding: 10,
    backgroundColor: '#eee',
    textTransform: 'uppercase',
    width: '25%',
    boxSizing: 'border-box' // Añadido para incluir el padding en el ancho
  },
  text: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#000',
    textDecoration: 'none',
    padding: 10,
    textTransform: 'uppercase',
    width: '75%',
    marginLeft: 10,
    boxSizing: 'border-box'// Añadido para incluir el padding en el ancho
  }
})

const InfoItem = ({ label, value }) => (
  <Text style={styles.grupo}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.text}>{value}</Text>
  </Text>
)

// Create Document Component
const ComprobanteDePago = ({ matriculaId }) => {
  const [listaDeMatriculas, setListaDeMatriculas] = useState([])
  const [listaDeAlumnos, setListaDeAlumnos] = useState([])
  const [coincidenciaMatricula, setCoincidenciaMatricula] = useState([])
  const [coincidenciaAlumno, setCoincidenciaAlumno] = useState([])
  //   const [fechaDePago, setFechaDePago] = useState('')
  const fechaDocumentoGenerado = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    const q = query(collection(db, 'matriculas'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nuevasMatriculas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setListaDeMatriculas(nuevasMatriculas)
    })
    return () => unsubscribe()
  }, [matriculaId])

  useEffect(() => {
    const q = query(collection(db, 'alumnos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nuevosAlumnos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setListaDeAlumnos(nuevosAlumnos)
    })
    return () => unsubscribe()
  }, [matriculaId])

  useEffect(() => {
    console.log(listaDeAlumnos)
    setCoincidenciaAlumno(
      listaDeAlumnos.filter(
        (alumno) => alumno.dni === coincidenciaMatricula[0]?.dni
      )
    )
  }, [listaDeAlumnos])

  useEffect(() => {
    console.log(listaDeMatriculas)
    setCoincidenciaMatricula(
      listaDeMatriculas.filter((matricula) => matricula.id === matriculaId)
    )
  }, [listaDeMatriculas])

  useEffect(() => {
    // setFechaDePago(new Date().toDate()?.toString())
  }, [coincidenciaMatricula])

  //   useEffect(() => {
  //     console.log(fechaDePago)
  //   }, [fechaDePago])

  console.log(coincidenciaAlumno)
  console.log(matriculaId)
  console.log(coincidenciaMatricula)
  console.log(coincidenciaMatricula[0]?.fechaDePago)

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          {coincidenciaAlumno.length > 0
            ? (
              <>
                <Text style={styles.header}>
                  Comprobante de Pago para {coincidenciaAlumno[0]?.nombre} {coincidenciaAlumno[0]?.apellidoPaterno} {coincidenciaAlumno[0]?.apellidoMaterno}
                </Text>
                <Image src={logo} />

                <View style={styles.section}>
                  <InfoItem label='ID' value={coincidenciaMatricula[0]?.id} />
                  <InfoItem
                    label='Temporada'
                    value={coincidenciaMatricula[0]?.temporada}
                  />
                  <InfoItem label='DNI' value={coincidenciaMatricula[0]?.dni} />
                  <InfoItem
                    label='Ciclo'
                    value={coincidenciaMatricula[0]?.ciclo}
                  />

                  <InfoItem
                    label='Descuento Aplicado'
                    value={coincidenciaMatricula[0]?.descuentoQueSeAplicara}
                  />
                  <InfoItem
                    label='Tipo de Pago'
                    value={coincidenciaMatricula[0]?.tipoDePago}
                  />

                  <InfoItem
                    label='Descuento Adicional'
                    value={coincidenciaMatricula[0]?.descuentoAdicional}
                  />
                  <InfoItem
                    label='Estado'
                    value={coincidenciaMatricula[0]?.estado}
                  />

                  <InfoItem
                    label='Monto Total'
                    value={coincidenciaMatricula[0]?.montonTotal}
                  />

                  {/* <Text style={styles.label}>Cuotas:</Text> */}
                  {/* <Text style={styles.text}>{coincidenciaMatricula[0]?.cuotas}</Text> */}

                  <InfoItem label='Fecha de generación de documento' value={fechaDocumentoGenerado} />
                </View>
              </>
              )

            : (
              <Text style={styles.text}>No hay información disponible.</Text>
              )}
        </View>
      </Page>
    </Document>

  )
}

export default ComprobanteDePago
