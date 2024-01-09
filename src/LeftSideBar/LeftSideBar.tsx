import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import './LeftSideBar.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as modalActions } from '../features/modal';
import { actions as regionsActions } from '../features/regions';

export const LeftSideBar = () => {
  const dispatch = useAppDispatch();
  const regions = useAppSelector(state => state.regions);

  const handleAddButtonClick = () => dispatch(modalActions.changeState(true));

  const handleClearFiltersButtonClick = () => dispatch(regionsActions.clearRegions());

  const handleRemoveRegionButtonClick = (region: string) => dispatch(regionsActions.removeRegion(region));

  return (
    <div className="side-bar">
      <button
        className="button button--add"
        onClick={handleAddButtonClick}
      >
        <div className='button__content'>
          <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "#00224B", }} />
          <p className='button__content-text--add'>Здати в оренду</p>
        </div>
      </button>

      <div className="side-bar__filters">
        <h4 className="side-bar__filters-text">Фільтри:</h4>

        <button
          className="button button--clear"
          onClick={handleClearFiltersButtonClick}
        >
          <div className='button__content'>
            <p className='button__content-text--clear'>Скинути всі фільтри</p>
            <FontAwesomeIcon icon={faXmark} size="xs" style={{ color: "rgb(248, 248, 248)", }} />
          </div>
        </button>

        {regions.map((region) => (
          <button
            className='button'
            onClick={() => handleRemoveRegionButtonClick(region)}
            key={region}
          >
            <div className='button__content'>
              <p className='button__content-text'>{region}</p>
              <FontAwesomeIcon icon={faXmark} size="xs" style={{ color: "rgb(0, 34, 75)" }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
