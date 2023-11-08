import { useState, useEffect } from "react";

function App() {

  const genders = [
    {key: '1', value: 'Erkek'},
    {key: '2', value: 'Kadın'},
  ]

  const categoryList = [
    {key: 1, value: 'PHP'},
    {key: 2, value: 'Javascript'},
    {key: 3, value: 'CSS'},
    {key: 4, value: 'HTML'},
  ]

  const levels = [
    {key: 'beginner', value: 'Başlangıç'},
    {key: 'Jr. Developer', value: 'Jr. Developer'},
    {key: 'Sr. Developer', value: 'Sr. Developer'},
  ]


  // const genders = ['Erkek', 'Kadın']
  const [name, setName] = useState('ömer')
  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('')
  const [categories, setCategories] = useState([2, 4])
  const [rule, setRule] = useState(true)
  const [rules, setRules] = useState([
    {key:1, value: '1. kuralı kabul ediyorum'},
    {key:2, value: '2. kuralı kabul ediyorum'},
    {key:3, value: '3. kuralı kabul ediyorum'},
  ])

  const [level, setLevel] = useState('')
  const [avatar, setAvatar] = useState(false)
  const [image, setImage] = useState(false)

  useEffect(() => {
    if (avatar) {
    const fileReader = new FileReader()

    fileReader.addEventListener('load', function() {
      setImage(this.result)
    })
    fileReader.readAsDataURL(avatar)
    }
  }, [avatar])

  const checkRule = (key, checked) => {
    setRules(rules => rules.map(rule => {
      if (key === rule.key){
        rule.checked = checked
      }
      return rule
    }))
  }

  const submitHandle = () => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    formData.append('name', name)
    fetch('https://google.com', {
      method: 'POST',
      body: formData
    })
  }

  const selectedGender = genders.find(g => g.key === gender)
  const selectedLevel = levels.find(g => g.key === level)
  const selectedCategories = categoryList.filter(category => categories.includes(category.key))
  const enabled = rules.every(rule => rule.checked) && avatar

  return (
    <>
      <button onClick={() => setName('ahmet')}>Adı Değiştir</button>
      <input type="text" value={name} defaultValue={name} onChange={e => setName(e.target.value)} /> <br />
      
      <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>

      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option value="">Seçin</option>
        {genders.map((gender, index) =>(
          <option value={gender.key} key={gender.key}>{gender.value}</option>
        ))}
        {/* <option value="1">Erkek</option>
        <option value="2">Kadın</option> */}
      </select> <br />

      <button onClick={() => setCategories([2,3,4])}>Kategorileri Seç</button>
      <select value={categories} multiple={true} onChange={e => setCategories([...e.target.selectedOptions].map(option => +option.value))}>
        <option value="">Seçin</option>
        {categoryList.map(category  =>(
          <option value={category.key} key={category.key}>{category.value}</option>
        ))}
        {/* <option value="1">Erkek</option>
        <option value="2">Kadın</option> */}
      </select> <br />

      <pre>{JSON.stringify(selectedCategories, null, 2)}</pre>

    <br />

    <label>
      <input type="checkbox" checked={rule} onChange={e => setRule(e.target.checked)}/>
      Kuralları kabul ediyorum 
    </label>

    <br />

      {rules.map(rule => (
        <label key={rule.key}>
        <input type="checkbox" checked={rule.checked} onChange={e => checkRule (rule.key, e.target.checked)} />
        {rule.value}
        </label>
      ))}
      
    <br />

    <br />

    <prev>{JSON.stringify(rules, null, 2)}</prev>

    <br />

    {levels.map((l, index) => (
      <label key={index}>
        <input type="radio" value={l.key} checked={l.key === level} onChange={e => setLevel(e.target.value)}/>
        {l.value}
      </label>

    ))} <br />

    {JSON.stringify(selectedLevel)} <br />

    <label>
      <input type="file" onChange={e => setAvatar(e.target.files[0])}/>

    </label>

    <br />

    {avatar && (
      <>
        <h3>{avatar.name}</h3>
        {image && <img src={image} alt=""/>}
      </>
    )}

      <button onClick={submitHandle} enabled={!rules}>Devam Et</button>
    </>
  );

}

export default App;
