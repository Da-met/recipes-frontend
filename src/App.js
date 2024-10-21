// import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import MiniCardsList from "./components/MiniCardsList/MiniCardsList";
import Header from "./components/Header/Header";
import CardRecipe from "./pages/CardRecipe/CardRecipe";

import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import CreateRecipe2 from "./pages/CreateRecipe/CreateRecipe2";

import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { MyProfile } from "./pages/MyProfile/MyProfile";
import { UserEdit } from "./pages/UserEdit/UserEdit";
import { SavedRecipes } from "./pages/SavedRecipes/SavedRecipes";
import { MyRecipes } from "./pages/MyRecipes/MyRecipes";
import UserBlock from "./pages/UserBlock/UserBlock";
// import { fetchAllRecipes, fetchAllSaveRecipes } from "./redux/slices/saveRecipes";

// let INITIAL_recipes = [
//   {
//     id: '785878',
//     img: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636431.jpg',
//     description: 'Картофельная запеканка с фаршем',
//     products: [
//       'Картофель - 800 г', 
//       'Фарш мясной (у меня свиной) - 400 г',
//       'Помидоры консервированные в с/с - 400 г',
//       'Лук репчатый - 100 г',
//       'Сыр твёрдый - 100 г',
//       'Яйца - 2 шт',
//       'Сметана - 100 г',
//       'Травы итальянские сушёные - 1 ч. ложка',
//     ],
//     keyWords: [
//       'Второе блюдо',
//       'Фарш',
//     ],
//     steps: [
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636439.jpg',
//         step: 'Картофель очищаем и нарезаем кружочками толщиной примерно 0,4 см. С помидоров в собственном соку снимаем кожицу. Мякоть помидоров вместе с соком измельчаем блендером. В свиной фарш добавляем 1/3 ч. ложки соли, 1/5 ч. ложки молотого перца и 2/3 ч. ложки итальянских трав. Туда же - измельчённые помидоры. Перемешиваем всё до равномерного распределения ингредиентов.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636435.jpg',
//         step: 'Включаем духовку для разогрева до 180-190 градусов. Форму для запекания (размером 18х22 см) смазываем растительным маслом. На дно формы выкладываем половину картофеля. Солим и перчим (1-2 щепотки).',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636442.jpg',
//         step: 'Сверху на картошку выкладываем фарш. Репчатый лук очищаем и нарезаем тонкими полукольцами. Равномерно распределяем лук поверх фарша. Посыпаем оставшейся смесью трав (1/3 ч. ложки).',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636445.jpg',
//         step: 'Выкладываем оставшийся картофель, солим и перчим (1-2 щепотки). Накрываем форму фольгой и отправляем заготовку в предварительно разогретую до 180-190 градусов духовку на 30-40 минут, до мягкости.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636450.jpg',
//         step: 'Для заливки яйца разбиваем в миску. Туда же всыпаем по щепотке соли и молотого перца. Добавляем сметану. Всё перемешиваем до однородности. Твёрдый сыр натираем на крупной тёрке, отправляем к остальным ингредиентам. Хорошо перемешиваем.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636453.jpg',
//         step: 'Вынимаем форму из духовки, снимаем фольгу. Если выделилось слишком много сока, можно его осторожно слить с помощью ложки. Равномерно распределяем заливку по поверхности запеканки. Возвращаем запеканку в духовку ещё на 15-20 минут, до готовности и зарумянивания (ориентируйтесь на особенности своей духовки).',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/637/big_636457.jpg',
//         step: 'Картофельная запеканка с фаршем готова. Нарезаем запеканку порционными кусочками и подаём.',
//       },
//     ],
//     href: 'https://www.russianfood.com/recipes/recipe.php?rid=169410',
//   },
//   {
//     id: '924904802',
//     img: 'https://img1.russianfood.com/dycontent/images_upl/657/big_656152.jpg',
//     description: 'Жаркое из курицы с картошкой',
//     products: [
//       'Куриное филе (бедра) - 500 г (3 шт.)', 
//       'Картофель - 600 г',
//       'Перец болгарский красный - 200 г',
//       'Помидор - 100 г',
//       'Лук репчатый - 130 г',
//       'Чеснок (некрупный) - 4 зубчика',
//       'Петрушка свежая - 20 г',
//       'Укроп свежий - 10 г',
//     ],
//     keyWords: [
//       'Второе блюдо',
//       'Курица',
//     ],
//     steps: [
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/657/big_656135.jpg',
//         step: 'Куриное мясо нарежьте небольшими кусочками. Курицу переложите в миску, добавьте по 0,5 ч. ложки соли и паприки, 2 щепотки чёрного перца и 1 ст. ложку растительного масла. Перемешайте.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/657/big_656137.jpg',
//         step: 'В глубокую широкую сковороду влейте оставшееся масло и разогрейте, выложите куриное мясо.Обжарьте курицу со всех сторон на среднем огне 10-12 минут, периодически помешивая. Затем переложите на тарелку.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/657/big_656138.jpg',
//         step: 'Пока жарится курица, лук нарежьте тонкими полукольцами, картофель – четвертинками. В оставшееся в сковороде масло выложите картошку и обжарьте на среднем огне 12-14 минут.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/657/big_656141.jpg',
//         step: 'Сладкий перец очистите, нарежьте тонкими пластинками, помидор – средними кусочками. Очищенный чеснок, зелень петрушки и укропа мелко порубите ножом.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/657/big_656144.jpg',
//         step: 'Картофель тем временем стал золотистым, почти готовым. Выложите его на тарелку. В сковороду отправьте лук, обжарьте 5 минут, помешивая. Добавьте сладкий перец и перемешайте. Обжаривайте ещё 5 минут, периодически помешивая. К обжаренным луку и перцу переложите картофель и курицу. Добавьте помидоры, чеснок и зелень. Перемешайте.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/657/big_656147.jpg',
//         step: 'Добавьте соль (1 ч. ложка), чёрный молотый перец (0,25 ч. ложки), молотую паприку (0,5 ч. ложки), перемешайте. Накройте сковороду крышкой. Готовьте на среднем огне 7-10 минут, до полной готовности мяса птицы и овощей. Жаркое из курицы с картошкой готово.',
//       },
//     ],
//     href: 'https://www.russianfood.com/recipes/recipe.php?rid=170344',
//   },
//   {
//     id: '30435059',
//     img: 'https://img1.russianfood.com/dycontent/images_upl/578/big_577787.jpg',
//     description: 'Отбивные из куриного филе в соевом кляре',
//     products: [
//       'Куриное филе - 600 г (2 шт.)', 
//       'Яйца - 2 шт',
//       'Соевый соус - 2 ст. ложки',
//       'Мука - 30 г',
//       'Чеснок сушёный - 1/3 ч. ложки',
//       'Масло подсолнечное - 75 мл (5 ст. ложек)',
//       'Соль - по вкусу',
//       'Перец чёрный молотый - щепотка',
//     ],
//     keyWords: [
//       'Второе блюдо',
//       'Курица',
//     ],
//     steps: [
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/578/big_577793.jpg',
//         step: 'Куриное филе промойте и обсушите с помощью бумажного полотенца. Разрежьте каждое филе вдоль на 3 пласта (зависит от толщины филе). У меня получилось 6 пластов. Отбейте каждый кусочек куриного филе с помощью кулинарного молотка. Слегка подсолите (1-2 щепотки).',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/578/big_577797.jpg',
//         step: 'Для кляра в миске соедините яйца, муку, соль (щепотка), чёрный молотый перец, сушёный чеснок и соевый соус. Перемешайте венчиком до получения однородного жидкого теста. Обмакните куриные отбивные в кляр.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/578/big_577799.jpg',
//         step: 'Разогрейте сковороду с растительным маслом и выложите туда отбивные. Жарьте куриные отбивные на среднем огне по 5 минут с каждой стороны. Таким образом обжарьте все отбивные.',
//       },
//       {
//         photo: 'https://img1.russianfood.com/dycontent/images_upl/578/big_577804.jpg',
//         step: 'Отбивные из куриного филе в соевом кляре готовы! Они получаются очень вкусными и ароматными!',
//       },
//     ],
//     href: 'https://www.russianfood.com/recipes/recipe.php?rid=166010',
//   },
// ]

// export {INITIAL_recipes};


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  // console.log(isAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])




  return (
    <div>
      <Router>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/" element={<MiniCardsList />}/>
            <Route path="/recipes/:id" element={<CardRecipe />}/>
            <Route path="/recipes/:id/edit" element={<CreateRecipe />}/>

            <Route path="/create-recipe" element={<CreateRecipe />}/>
            {/* <Route path="/create-recipe" element={<CreateRecipe2 />}/> */}

            <Route path="/register" element={<Registration />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/my-profile" element={<MyProfile />}/>
            <Route path="/my-profile/edit/:id" element={<UserEdit />}/>
            <Route path="/my-saved-recipes" element={<SavedRecipes />}/>
            <Route path="/my-recipes" element={<MyRecipes />}/>

            <Route path="/user-block/:id" element={<UserBlock />}/>
          </Routes>
        </div>
      </Router>


    </div>
  );
}

export default App;
