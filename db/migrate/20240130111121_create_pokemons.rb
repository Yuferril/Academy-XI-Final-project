class CreatePokemons < ActiveRecord::Migration[7.0]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.text :description
      t.string :element_type
      t.decimal :price, precision: 8, scale: 2
      t.timestamps
    end
  end
end