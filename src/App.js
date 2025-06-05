import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const flicker = keyframes`
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        opacity: 0.8;
        text-shadow: 0 0 5px #e4b721, 0 0 10px #e4b72180;
    }
    20%, 24%, 55% {
        opacity: 0.6;
        text-shadow: none;
    }
`;

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
`;

const scanline = keyframes`
    from { transform: translateY(-100%); }
    to { transform: translateY(100%); }
`;

const Wrapper = styled.div`
    position: relative;
    min-height: 100vh;
    background:
    //        #0a0a0a,
            linear-gradient(to right, rgba(228, 183, 33, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(228, 183, 33, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    color: #e4b721;
    display: flex;
    justify-content: center;
    overflow: hidden;
    font-family: 'Orbitron', sans-serif;
`;

const Container = styled.div`
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
const TopContent = styled.div`
    display: flex;
    column-gap: 12px;
    width: 100%;
    justify-content: right;
    padding: 20px 0;
`;
const About = styled.div`
    display: flex;
    flex-direction: column;
    column-gap: 12px;
    width: 100%;
    padding: 20px 0;
`;
const MiddleContent = styled.div`
    display: flex;
    flex-direction: column;
`;
const Description = styled.h3`
 margin: 1px;
`;

const Text= styled.p`
    
`;

const BottomContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`;

const GlassOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
            radial-gradient(circle at 20% 30%, rgba(228, 183, 33, 0.15) 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(228, 183, 33, 0.15) 0%, transparent 25%),
            repeating-linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.15),
                    rgba(0, 0, 0, 0.15) 1px,
                    transparent 1px,
                    transparent 2px
            );
    z-index: 0;
`;

const Scanline = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(228, 183, 33, 0.1) 50%,
            transparent 100%
    );
    animation: ${scanline} 8s linear infinite;
    z-index: 1;
`;
const PhotoFrame = styled.div`
    border: 5px solid #e4b721; /* Цвет и толщина рамки */
    border-radius: 10px; /* Скругление углов */
    display: inline-block; /* Позволяет рамке обтекать изображение */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Тень для рамки */
    background-color: white;
`;

const Photo = styled.img`
    width: 200px; /* фиксированная ширина */
    height: 200px; /* фиксированная высота */
    object-fit: cover; /* изображение заполняет рамку без искажения */
    border-radius: 5px; /* Скругление углов изображения */
    display: block; /* Убираем лишние отступы */
`;
const Title = styled.h6`
    font-size: 2rem;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 5px;
    ${css`animation: ${flicker} 3s infinite;`}
    position: relative;
    z-index: 2;
    text-shadow: 0 0 10px #e4b72180;
    @media (min-width: 768px) {
        font-size: 3rem;
        margin: 1px;
        text-align: center;
    }
`;

const Menu = styled.ul`
    list-style: none;
    padding: 0;
    text-align: center;
    bottom: 10px;
    z-index: 2;
    @media (min-width: 768px) {
        display: flex;
    }
`;

const MenuLink = styled.a`
    color: inherit;
    text-decoration: none;
    display: block;
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    flex-direction: row;

    &:hover {
        color: #fff;
        background: rgba(228, 183, 33, 0.15);
        transform: translateX(10px) scale(1.05);
        box-shadow: 0 0 15px rgba(228, 183, 33, 0.3);

        &::before {
            content: ">";
            position: absolute;
            left: -15px;
            animation: ${pulse} 0.8s infinite;
        }
    }

    &:active {
        transform: translateX(10px) scale(0.98);
        transition: all 0.1s;
    }

    ${({ active }) => active && css`
        color: #fff;
        background: rgba(228, 183, 33, 0.2);
        transform: translateX(10px);
        box-shadow: 0 0 20px rgba(228, 183, 33, 0.4);
        &::before {
            content: ">";
            position: absolute;
            left: -15px;
        }
    `}
`;

const MenuItem = styled.li`
    font-size: 1.5rem;
    margin: 1.5rem 0;
    cursor: pointer;
    position: relative;
    bottom: 10px;
    text-shadow: 0 0 5px #e4b72180;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 0.8rem;
  opacity: 0.7;
  z-index: 2;
`;

const copyTextToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Текст успешно скопирован в буфер обмена!');
    } catch (err) {
        console.error('Ошибка:', err);
    }
};

function App() {
    const [activeItem, setActiveItem] = useState(null);

    const menuItems = [
        { text: "TELEGRAM", link: "https://t.me/RubinKirill" },
        { text: "LINKEDIN", link: "https://www.linkedin.com/in/kirill-rubin-850360347/" },
        { text: "MAIL", link: "workiteen@gmail.com" },
    ];

    return (
        <Wrapper>
            <GlassOverlay />
            <Scanline />
            <Container>
                <TopContent>
                    <About>
                    <h1>Возраст: 29</h1>
                    <h1>Имя: Кирилл</h1>
                    </About>
                    <PhotoFrame>
                        <Photo src={'myPhoto.jpeg'} alt={''}/>
                    </PhotoFrame>
                </TopContent>
                <MiddleContent>
                    <Description>Обо мне:</Description>
                    <Text>
                        Меня зовут Кирилл, я — Backend-разработчик с более чем двухлетним опытом работы. В профессиональной сфере я стремлюсь что-то улучшить или разработать, что помогает оптимизировать и ускорить бизнес-процессы. Вне работы я увлекаюсь настольными играми и читаю литературу в жанре "экономический роман", что мотивирует развиваться в аналитическом и экономическом мышлении. Также я ценю здоровый образ жизни: регулярно занимаюсь в тренажерном зале, поскольку считаю важным развиваться всесторонне, сочетая физические и интеллектуальные навыки.
                    </Text>
                    <Description>Опыт:</Description>
                    <Text>
                        За 2 года работы в области backend-разработки были реализованы интеграции с внешними платежными системами, включая методы B2B и bank transfer. Доработана админская часть multiaccounts для обнаружения недобросовестных пользователей с множественными аккаунтами. Разработан сервис cron-scheduler для проверки и свободного задания времени выполнения регламентных задач без необходимости внесения доработок. Оптимизированы пользовательские запросы и настроена система фильтров.
                    </Text>
                    <Description>Инструменты:</Description>
                    <Text>
                        TypeScript, JavaScript, MySQL, PostgreSQL, Redis, RabbitMQ, Nginx, Docker
                    </Text>
                </MiddleContent>
                <BottomContent>
                    <Title>КОНТАКТЫ</Title>
                    <Menu>
                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                onMouseEnter={() => setActiveItem(index)} onMouseLeave={() => setActiveItem(null)}
                            >
                                <MenuLink
                                    href={item.link}
                                    active={activeItem === index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log(`Переход на: ${item.link}`);
                                        //Переход по ссылке, если не почта
                                        if(index !== 2){
                                         window.location.href = item.link;
                                        }
                                        else {
                                            copyTextToClipboard(item.link)
                                            // copyTextWithFallback(item.link)
                                        }
                                    }}
                                >
                                    {item.text}
                                </MenuLink>
                            </MenuItem>
                        ))}
                    </Menu>
                </BottomContent>

            </Container>
            <Footer>© Rubin Kirill | 2025</Footer>
        </Wrapper>
    );
}

export default App;
