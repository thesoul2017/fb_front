import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";

const TotalCategory = ({data}) => {
    const {category} = useContext(Context);

    const [total, setTotal] = useState([{name: '', icon: '', total: 0}]);

    useEffect(() => {
        let findData = [];
        category.categories.map(item => {
            const findSum = data.find(d => d.categoryId === item.id);
            const sum = findSum ? findSum.total : 0;
            findData.push({name: item.name, icon: item.icon, total: sum});
        });

        setTotal(findData);
    }, [data]);

    return (
        <div className="block total-category">
            {total.map((item, index) =>
                <div key={index} className="total-category-item">
                    <img className="category-icon" src={"./images/icon/" + item.icon + ".png"} alt={item.name} />
                    <p>{(item.total).toFixed(2)} руб.</p>
                </div>
            )}
        </div>
    );
};

export default TotalCategory;
