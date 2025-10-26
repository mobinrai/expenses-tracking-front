import { useParams } from 'react-router-dom'

const Edit = () => {
    const {id} = useParams()
  return (
    <div>Edit: {id}</div>
  )
}

export default Edit