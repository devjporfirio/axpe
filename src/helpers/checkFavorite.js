import { useSelector } from 'react-redux';

export default function(reference) {
  const access = useSelector(state => state.user);
  const building = access.favorites.find(x => x.reference === reference);

  return !!building;
}
