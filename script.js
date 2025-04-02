// 角色数据
const characters = {
    "角色1": {
        name: "角色1",
        image: "images/character1.png",
        standingModel: "models/character1_standing.glb",
        movingModel: "models/character1_moving.glb"
    },
    "角色2": {
        name: "角色2",
        image: "images/character2.jpg",
        standingModel: "models/character2_standing.glb",
        movingModel: "models/character2_moving.glb"
    }
    // 可以继续添加更多角色
};

function getCharacterNameFromImage(imagePath) {
    // 从图片路径中提取角色名称
    return imagePath.split('/').pop().split('.')[0];
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const characterName = document.getElementById('characterName');
    const characterImage = document.getElementById('characterImage');
    const standingModel = document.getElementById('standingModel');
    const movingModel = document.getElementById('movingModel');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // 角色数据
    const characters = {
        "chong": {
            name: "虫",
            image: "pic/chong.png",
            standingModel: "stand/chong.glb",
            movingModel: "move/chong_move.glb"
        }
        // 可以继续添加更多角色
    };

    function showLoading() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
    }

    function hideLoading() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }

    async function loadCharacter(character) {
        try {
            showLoading();
            
            // 加载图片
            characterName.textContent = character.name;
            characterImage.src = character.image;
            characterImage.style.display = 'block';
            
            // 加载3D模型
            if (standingModel) {
                standingModel.src = '';  // 清除现有模型
                await new Promise(resolve => setTimeout(resolve, 100)); // 短暂延迟
                standingModel.src = character.standingModel;
            }
            
            if (movingModel) {
                movingModel.src = '';  // 清除现有模型
                await new Promise(resolve => setTimeout(resolve, 100)); // 短暂延迟
                movingModel.src = character.movingModel;
                // 确保动画播放
                movingModel.play();
            }
            
            searchInput.value = character.name;
        } catch (error) {
            console.error('加载角色失败:', error);
            alert('加载角色失败，请检查文件是否存在！');
        }
    }

    // 创建角色列表展示
    const container = document.querySelector('.container');
    const characterList = document.createElement('div');
    characterList.className = 'character-list';
    
    Object.values(characters).forEach(character => {
        const characterItem = document.createElement('div');
        characterItem.className = 'character-item';
        characterItem.innerHTML = `
            <img src="${character.image}" alt="${character.name}" onerror="this.src='pic/default.png'">
            <p>${character.name}</p>
        `;
        
        characterItem.addEventListener('click', () => {
            loadCharacter(character);
        });
        
        characterList.appendChild(characterItem);
    });

    container.insertBefore(characterList, document.querySelector('.character-display'));

    function searchCharacter() {
        const searchTerm = searchInput.value.trim();
        const character = characters[searchTerm] || Object.values(characters).find(
            char => char.name === searchTerm
        );

        if (character) {
            loadCharacter(character);
        } else {
            alert('未找到该角色！');
        }
    }

    searchButton.addEventListener('click', searchCharacter);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCharacter();
        }
    });

    // 监听3D模型加载事件
    standingModel.addEventListener('load', () => {
        console.log('站立模型加载完成');
        hideLoading();
    });

    movingModel.addEventListener('load', () => {
        console.log('移动模型加载完成');
        hideLoading();
    });

    standingModel.addEventListener('error', () => {
        console.error('站立模型加载失败');
        hideLoading();
        alert('站立模型加载失败，请检查文件是否存在！');
    });

    movingModel.addEventListener('error', () => {
        console.error('移动模型加载失败');
        hideLoading();
        alert('移动模型加载失败，请检查文件是否存在！');
    });

    // 自动加载第一个角色
    const firstCharacter = Object.values(characters)[0];
    if (firstCharacter) {
        loadCharacter(firstCharacter);
    }
}); 