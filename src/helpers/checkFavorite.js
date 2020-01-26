import { useSelector } from 'react-redux';

export default function(reference) {
  const user = useSelector(state => state.user);
  const building = user.favorites.find(x => x === reference);

  return !!building;
}
