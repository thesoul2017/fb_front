import {BsArrowDownCircle, BsArrowUpCircle} from "react-icons/bs";
import {useEffect, useState} from "react";

const TotalBudget = ({data}) => {
    const [total, setTotal] = useState([{type: 1, total: 0}, {type: 2, total: 0}]);

    useEffect(() => {
        if (data.length)
            setTotal(data);
    }, [data]);

    return (
        <div className="total">
            {total.map(item =>
                <div key={item.type}
                     className={item.type === 1 ? "total-block total-red" : "total-block total-green"}>
                    <p className="total-count">{(item.total).toFixed(2)} руб.</p>
                    <p className="total-title">{item.type === 1 ? "Расходов" : "Доходов"}</p>
                    <div className="total-icon">
                        {item.type === 1 ? <BsArrowDownCircle/> : <BsArrowUpCircle/>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TotalBudget;
