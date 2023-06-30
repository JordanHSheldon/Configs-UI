import { useDispatch } from 'react-redux'
import { deleteSetting } from '../features/settingsSlice'

function SettingsItem({ Setting }) {
  const dispatch = useDispatch()

  return (
    <div className='setting'>
      <button onClick={() => dispatch(deleteSetting(Setting._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default SettingsItem