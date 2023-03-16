class InitialSchema < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :password_digest, null: false
      t.timestamps
    end

    create_table :categories do |t|
      t.string :name, null: false, index: { unique: true }
      t.timestamps
    end

    create_table :recipes do |t|
      t.string :title, null: false, index: true
      t.integer :cook_time, null: false
      t.integer :prep_time, null: false
      t.string :image_url
      t.references :user, index: true
      t.references :category, index: true
      t.timestamps
    end

    create_table :ingredients do |t|
      t.string :item, null: false
      t.references :recipe, index: true, null: false
      t.timestamps
    end
  end
end
