import { useEffect, useState } from 'react';
import FlowChart from '../Containers/flows/flow';

export default function Index() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted ? (
      <FlowChart width='100%' height='100%' />
  ) : null;
}
